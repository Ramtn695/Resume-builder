import { Component, OnInit } from '@angular/core';
import { Resume } from '../resume';
import ResumeService from '../resume.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  resume: Resume;
  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    this.resume = JSON.parse(this.resumeService.getResume());
    console.log(this.resume);
    
  }


}
