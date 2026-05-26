import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  appVersion: string;
  currentYear = new Date().getFullYear();

  constructor() {
    // Get version from window.appConfig
    this.appVersion = (window as any).appConfig?.appVersion || '1.0.0';
  }

  ngOnInit(): void {
  }

}
