import { Component } from '@angular/core';
import { GeneralServiceService } from '../service/general-service.service';

@Component({
  selector: 'app-about-course',
  templateUrl: './about-course.component.html',
  styleUrls: ['./about-course.component.css']
})

export class AboutCourseComponent {

  quiz_content: any[] = [];

  constructor(
    private service: GeneralServiceService,
  ) {}
}
