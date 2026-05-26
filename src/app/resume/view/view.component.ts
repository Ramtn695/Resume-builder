import { Component, OnInit } from '@angular/core';
import { Resume } from '../model/resume';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  resume!: Resume;
  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    const raw = this.resumeService.getResume();
    if (!raw) { return; }
    this.resume = JSON.parse(raw);
  }


}
