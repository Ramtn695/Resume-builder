import { Component, OnInit } from '@angular/core';
import ResumeService from './resume/resume.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'resume-builder';
  hasResumeData = false;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.checkResumeData();
  }

  checkResumeData(): void {
    try {
      const resumeData = this.resumeService.getResume();
      this.hasResumeData = !!resumeData && resumeData !== 'null';
    } catch (error) {
      this.hasResumeData = false;
    }
  }
}
