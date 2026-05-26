import { Injectable } from '@angular/core';
import { Resume } from '../model/resume';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  resume!: Resume;
  constructor() { }

  createResume(resumeData: Resume) {
    window.sessionStorage.setItem('resume', JSON.stringify(resumeData));
  }

  getResume() {
    return window.sessionStorage.getItem('resume');
  }
}
