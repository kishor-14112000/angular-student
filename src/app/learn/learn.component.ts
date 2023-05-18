import { ViewEncapsulation } from '@angular/compiler';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { GeneralServiceService } from '../service/general-service.service';


@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
})
export class LearnComponent {
  encapsulation: ViewEncapsulation.None | undefined
  AllData: any;
  button1Hidden = false;
  button2Hidden = true;
  sidebarVisible2!: boolean;
  text!:string;
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;

  constructor(private service: GeneralServiceService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getDataFromAPI();
    this.startCounter();
  }

  getDataFromAPI() {
    this.service.getData().subscribe(
      (response: any) => {
        this.AllData = response.data;
        console.log(this.AllData, 'Hello');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  // sidebar

  toggleButtonVisibility(buttonId: string) {
    if (buttonId === 'button1') {
      this.button1Hidden = true;
      this.button2Hidden = false;
      
    } else if (buttonId === 'button2') {
      this.button1Hidden = false;
      this.button2Hidden = true;
    }
  }

  openNav(): void {
    document.getElementById('mySidebar')!.style.width = '420px';
    document.getElementById('main')!.style.marginLeft = '500px';
  }

  closeNav(): void {
    document.getElementById('mySidebar')!.style.width = '40px';
    document.getElementById('main')!.style.marginLeft = '40px';
  }

  // for quiz

  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe((val: any) => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    // this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
}
