import { Injectable } from '@angular/core';
import { Resume } from './resume';

@Injectable({ providedIn: 'root' })
export default class ResumeService {
  resume: Resume;
  constructor() { }

  createResume(resumeData: Resume) {
    window.sessionStorage.setItem('resume', JSON.stringify(resumeData));
  }

  getResume() {
    return window.sessionStorage.getItem('resume');
  }
}
