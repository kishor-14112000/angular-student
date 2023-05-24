import { Component } from '@angular/core';
import { GeneralServiceService } from '../service/general-service.service';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css'],
})
export class InteractiveComponent {
  typingMessage!: string;
  message: string = `<b>Introduction to angular</b><br><br>
  <p>I am going to give a brief introduction to <strong>Angular Framework</strong>. At the end of this article, you will understand the following details.</p>
  <p>
  What is Angular, Why we need Angular, What is ECMAScript, What is Typescript, Different Between AngularJS and Angular</p>`;

  learn_content: any[] = [];
  currentData: any;
  index: number = 0;
  currentIndex: number = 0;
  showNext: boolean = false;

  constructor(private service: GeneralServiceService) {}

  ngOnInit(): void {
    
  }

  typeMessage() {
    let words = this.message.split(' ');
    let i = 0;
    let intervalId = setInterval(() => {
      if (i < words.length) {
        this.typingMessage += words[i] + ' ';
        i++;
      } else {
        clearInterval(intervalId);

        // Show the button after a delay of 2 seconds
      }
    }, 70);
  }

  // getDataLearnAPI() {
  //   this.service.getData_learn_content().subscribe(
  //     (response: any) => {
  //       this.learn_content = response.data;
  //       console.log(this.learn_content, 'Hello');
  //     },
  //     (error) => {
  //       console.log('Error is:', error);
  //     }
  //   );
  // }

  // showNextData(index: number) {
  //   this.currentDataIndex = index;
  // }

  // showNextContent() {
  //   this.index++;
  // }

  showNextContent() {
    if (this.currentIndex < this.learn_content.length - 1) {
        this.currentIndex++;
        this.showNext = true;
    }
}
}
