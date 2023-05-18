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

  // getQuizData() {
  //   this.service.get_quiz_content().subscribe(
  //     (response: any) => {
  //       this.quiz_content = response.data;
  //       localStorage.setItem('quiz_content', JSON.stringify(this.quiz_content));
  //       console.log(this.quiz_content, 'Quiz datas');
  //     },
  //     (error) => {
  //       console.log('Error is:', error);
  //     }
  //   );
  // }
}
