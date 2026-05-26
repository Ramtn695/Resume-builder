// dynamic-material-form.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

type Field = any;
type GroupSchema = { [groupName: string]: Field[] };

@Component({
  selector: 'app-dynamic-material-form',
  templateUrl: './dynamic-material-form.component.html',
  styleUrls: ['./dynamic-material-form.component.scss'],
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: DynamicMaterialFormComponent,
        multi: true,
      },
    ],
})
export class DynamicMaterialFormComponent implements OnInit, AfterViewInit {
  @Input() schema: GroupSchema | null = null;
  @Input() useStepper = false;
  @Output() formSubmit = new EventEmitter<any>();

  groups: { name: string; fields: Field[]; form: FormGroup }[] = [];
  activeIndex = 0;

  @ViewChildren('sigCanvas') sigCanvases!: QueryList<
    ElementRef<HTMLCanvasElement>
  >;
  private signatureContexts: { [id: string]: CanvasRenderingContext2D | null } =
    {};
  private drawing = false;
  private lastPos: { x: number; y: number } | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.schema) this.schema = this.fullDefaultSchema();
    this.buildGroups();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initAllSignatureCanvases(), 0);
  }

  private buildGroups() {
    this.groups = [];
    for (const [name, fields] of Object.entries(this.schema || {})) {
      const group = this.fb.group({});
      for (const f of fields) {
        const control = new FormControl(
          { value: f.value ?? '', disabled: f.disabled ?? false },
          this.parseValidators(f.validators || [])
        );
        group.addControl(f.id, control);
      }
      this.groups.push({ name, fields, form: group });
    }
  }

  private parseValidators(validators: string[] = []): ValidatorFn[] {
    const fns: ValidatorFn[] = [];
    for (const v of validators) {
      if (!v) continue;
      if (v === 'required') fns.push(Validators.required);
      else if (v.startsWith('minLength:')) {
        const n = parseInt(v.split(':')[1], 10);
        if (!isNaN(n)) fns.push(Validators.minLength(n));
      } else if (v.startsWith('maxLength:')) {
        const n = parseInt(v.split(':')[1], 10);
        if (!isNaN(n)) fns.push(Validators.maxLength(n));
      } else if (v.startsWith('min:')) {
        const n = parseFloat(v.split(':')[1]);
        if (!isNaN(n)) fns.push(Validators.min(n));
      } else if (v.startsWith('max:')) {
        const n = parseFloat(v.split(':')[1]);
        if (!isNaN(n)) fns.push(Validators.max(n));
      } else if (v === 'email') fns.push(Validators.email);
      else if (v.startsWith('pattern:')) {
        const p = v.substring('pattern:'.length);
        try {
          fns.push(Validators.pattern(p));
        } catch {
          // ignore invalid pattern
        }
      }
    }
    return fns;
  }

  selectTab(i: number) {
    this.activeIndex = i;
    setTimeout(() => this.initAllSignatureCanvases(), 0);
  }
  prev() {
    if (this.activeIndex > 0) this.activeIndex--;
    setTimeout(() => this.initAllSignatureCanvases(), 0);
  }
  next() {
    if (this.activeIndex < this.groups.length - 1) this.activeIndex++;
    setTimeout(() => this.initAllSignatureCanvases(), 0);
  }

  submit() {
    const payload: any = {};
    for (const g of this.groups) payload[g.name] = g.form.getRawValue();
    this.formSubmit.emit(payload);
    console.log('FORM SUBMIT', payload);
  }

  onFileChange(groupIndex: number, field: Field, event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;
    const control = this.groups[groupIndex].form.get(field.id);
    if (control)
      control.setValue(
        field.fileInputs?.multiple ? Array.from(files) : files[0]
      );
  }

  onMultiSelectChange(groupIndex: number, field: Field, values: any[]) {
    const control = this.groups[groupIndex].form.get(field.id);
    if (control) control.setValue(values);
  }

  private initAllSignatureCanvases() {
    this.sigCanvases.forEach((elRef) => {
      const canvas = elRef.nativeElement;
      const id = canvas.getAttribute('data-id') || '';
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      this.signatureContexts[id] = ctx;
      const f = this.findFieldById(id);
      const width = f?.styles?.width
        ? parseInt(String(f.styles.width).replace('px', ''), 10) || 400
        : 400;
      const height = f?.styles?.height
        ? parseInt(String(f.styles.height).replace('px', ''), 10) || 150
        : 150;
      canvas.width = width;
      canvas.height = height;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const group = this.findGroupContainingField(id);
      if (group) {
        const val = group.form.get(id)?.value;
        if (val) {
          const img = new Image();
          img.onload = () =>
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          img.src = val;
        }
      }

      this.attachSignatureEvents(canvas, id, group?.form);
    });
  }

  private attachSignatureEvents(
    canvas: HTMLCanvasElement,
    id: string,
    form?: FormGroup
  ) {
    const ctx = this.signatureContexts[id];
    if (!ctx) return;
    const start = (e: MouseEvent | TouchEvent) => {
      this.drawing = true;
      this.lastPos = this.getPos(canvas, e);
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!this.drawing || !this.lastPos) return;
      const pos = this.getPos(canvas, e);
      if (!pos) return;
      ctx.beginPath();
      ctx.moveTo(this.lastPos.x, this.lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      this.lastPos = pos;
    };
    const end = () => {
      this.drawing = false;
      this.lastPos = null;
      const dataUrl = canvas.toDataURL('image/png');
      form?.get(id)?.setValue(dataUrl);
    };

    canvas.onmousedown = (e) => start(e);
    canvas.onmousemove = (e) => move(e);
    canvas.onmouseup = () => end();
    canvas.ontouchstart = (e) => start(e);
    canvas.ontouchmove = (e) => move(e);
    canvas.ontouchend = () => end();
  }

  clearSignature(groupIndex: number, field: Field) {
    const canvasRef = this.sigCanvases.find(
      (c) => c.nativeElement.getAttribute('data-id') === field.id
    );
    if (!canvasRef) return;
    const el = canvasRef.nativeElement;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, el.width, el.height);
    this.groups[groupIndex].form.get(field.id)?.setValue(null);
  }

  private getPos(canvas: HTMLCanvasElement, e: MouseEvent | TouchEvent) {
    const rect = canvas.getBoundingClientRect();
    if (e instanceof MouseEvent)
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const t = (e as TouchEvent).touches[0];
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }

  private findGroupContainingField(id: string) {
    return this.groups.find((g) => g.fields.some((f: any) => f.id === id));
  }
  private findFieldById(id: string) {
    for (const g of this.groups) {
      const f = g.fields.find((x: any) => x.id === id);
      if (f) return f;
    }
    return null;
  }

  private fullDefaultSchema(): GroupSchema {
    return {
      personalInformation: [],
      accountInformation: [],
      addressInformation: [],
      financialInformation: [],
      employmentInformation: [],
      signaturePanel: [],
    };
  }
  toggleCheckbox(
    groupIndex: number,
    field: any,
    option: any,
    checked: boolean
  ) {
    const control = this.groups[groupIndex].form.get(field.id);
    if (!control) return;

    const current: any[] = Array.isArray(control.value)
      ? control.value.slice()
      : [];
    if (checked) {
      if (!current.includes(option)) current.push(option);
    } else {
      const idx = current.indexOf(option);
      if (idx > -1) current.splice(idx, 1);
    }

    control.setValue(current);
    control.markAsDirty();
    control.updateValueAndValidity();
  }
}
