import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { saveAs } from 'file-saver';
import Quill from 'quill';
import { QuillEditorComponent } from 'ngx-quill';
import { GeneralServiceService } from '../service/general-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  @ViewChildren('radioButton') radioButton!: QueryList<ElementRef>;
  @ViewChild('checkboxList') checkboxList!: ElementRef;
  @ViewChild('editor') editor!: QuillEditorComponent;
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('radios') radios!: ElementRef;

  AllData: any;
  learn_content: any;
  desiredIndex = 0;
  sidebarVisible2!: boolean;
  showTranscriptFlag = false;
  showNextButton = true;
  endedSubscription: any;
  videoEndedForFirstTime = false;
  showAnswer = false;
  showAnswerWrong = false;
  correct_answer = false;
  ingredient!: string;
  currentQuizIndex = 0;
  selectedOption: any = '';
  isOptionSelected: boolean = false;
  isAnyOptionSelected!: boolean;
  quiz_content: any[] = [];
  showCheckboxQuiz: boolean = false;
  showRadioQuiz: boolean = false;
  answer_content: any;
  current_question_index = 0;
  ans: any[] = [];
  c_ans: any[] = [];
  showNextAllDiv: boolean = false;
  selectedCheckboxIndex!: number;
  moduleNo: any;
  contentNo: any;
  quesId: any;
  i: number = 0;
  opt_ans: any;
  ans_opt: any;
  exp_opt = '';
  left: any = [];
  right: any = [];
  f_subject: any;
  f_feedback: any;
  correctAnswer: any[] = [];
  correctAnswers: any[] = [];
  module_content_count: any;
  module_count: any;
  selectedCheckboxes: boolean[][] = [];
  selectedCheckboxValues: string[][] = [];
  selectedOptionIndex!: number;
  checkedStatus: boolean[] = [];
  areOptionsSelected: boolean[] = [];
  all_course_content: any;

  constructor(
    private service: GeneralServiceService,
    private elRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.selectedOption = '';
    this.activatedRoute.paramMap.subscribe((params) => {
      this.moduleNo = Number(params.get('module_no'));
      this.contentNo = Number(params.get('content_no'));
      this.getQuizData();
      this.getAnswerData();
      this.get_content_count();
      this.getFullContentData();
    });
    this.checkedStatus = Array(this.left.length).fill(false);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    const optionCount = this.left.length;
    const checkboxCount = this.left.length;
    const isCtrlPressed = event.ctrlKey || event.metaKey; // Check if Ctrl key is pressed
    const isEnterPressed = event.key === 'Enter'; // Check if Enter key is pressed

    if (keyCode >= 49 && keyCode <= 49 + optionCount) {
      this.selectedOptionIndex = keyCode - 49;
      this.selectedOption = this.left[this.i][this.selectedOptionIndex];
      this.isOptionSelected = true;
    }

    if (isCtrlPressed && isEnterPressed) {
      this.checkAnswer(); // Call the checkAnswer() method when Ctrl+Enter is pressed
    }
  }

  getCharacterFromCode(code: number): string {
    return String.fromCharCode(65 + code);
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }

  checked!: boolean;
  atLeastOneCheckboxChecked = false;
  showTranscript() {
    this.showTranscriptFlag = !this.showTranscriptFlag;
  }

  updateSelection(): void {
    this.isAnyOptionSelected = this.selectedOption !== null;
  }

  toggleOptionSelection(index: number) {
    this.areOptionsSelected[index] = !this.areOptionsSelected[index];
  }

  quillModules = {};

  exportText() {
    const quill = new Quill(this.editor.editorElem);
    const text = quill.getText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'document.txt');
  }

  AfterSuccess() {
    this.correct_answer = true;
  }

  //get data

  onNextClicked() {
    if (this.currentQuizIndex < this.answer_content.length + 1) {
      this.currentQuizIndex++;
      this.resetAnswerStatus();
    }
  }

  previousQuestion() {
    if (this.currentQuizIndex > 0) {
      this.currentQuizIndex--;
      this.resetAnswerStatus();
    }
  }

  resetAnswerStatus() {
    this.showAnswer = false;
    this.showAnswerWrong = false;
  }

  finishQuiz() {
    const nextContentNo = this.contentNo + 1;
    // Check if nextContentNo exceeds the total content count
    const nextModuleNo = nextContentNo > this.module_content_count ? this.moduleNo + 1 : this.moduleNo;
    const nextContentIndex = nextContentNo > this.module_content_count ? 1 : nextContentNo;
    
    this.router.navigate([`/content/${nextModuleNo}/${nextContentIndex}`]);
  }
  
  getFullContentData() {
    this.service.get_course_contents(this.moduleNo,this.contentNo).subscribe(
      (response: any) => {
        this.all_course_content = response.data;
        console.log(this.all_course_content, 'all content datas');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  playVideo() {
    this.videoElement.nativeElement.play();
  }

  pauseVideo() {
    this.videoElement.nativeElement.pause();
  }

  isChecked: boolean = false;
  isCheckBoxSelected: boolean = false;
  onCheckBoxChange() {
    this.isCheckBoxSelected = this.ans.some(
      (checkbox: { checked: any }) => checkbox.checked
    );
  }

  onSubmit() {
    const feedback_data = {
      subject: this.f_subject,
      feedback: this.f_feedback,
    };
    this.service.addFeedback(feedback_data).subscribe((response: any) => {
      console.log(response, 'Feedback data');
    });
  }

  getQuizData() {
    this.service.get_quiz_content(this.moduleNo,this.contentNo).subscribe(
      (response: any) => {
        this.quiz_content = response.data;
        console.log(this.quiz_content, 'Quiz datas');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  get_content_count() {
    this.service.get_course_content_count(this.moduleNo).subscribe(
      (response: any) => {
        this.module_content_count = response.data[0].content_count;
        // this.module_count = response.data[1].module_count;
        console.log(response.data,"response.data ........ ");
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  getAnswerData() {
    this.service.get_answer_content().subscribe(
      (response: any) => {
        this.answer_content = response.data;
        console.log(this.answer_content, 'Answer datas');

        // Iterate over the answer_content array
        for (let i = 0; i < this.answer_content.length; i++) {
          const ques_id = this.answer_content[i].ques_id;
          const options = this.answer_content[i].options;
          const optionArray = options.split(',');
          const questionCorrectAnswers = [];

          for (let j = 0; j < optionArray.length; j++) {
            const [option, isCorrect] = optionArray[j].split('|');
            if (isCorrect === '1') {
              questionCorrectAnswers.push(option);
            }
          }
          this.correctAnswers[ques_id] = questionCorrectAnswers;
          this.ans[i] = optionArray.map(
            (option: string) => option.split('|')[0]
          );          
          this.left[i] = this.ans[i];

          this.ans[i] = optionArray.map(
            (options: string) => options.split('|')[1]
          );          
          this.right[i] = this.ans[i];
          this.selectedCheckboxes = this.answer_content.map(() => []);
          this.selectedCheckboxes[i] = [];
          for (let j = 0; j < this.left[i].length; j++) {
            this.selectedCheckboxes[i][j] = false;
          }
          this.selectedCheckboxValues[i] = [];
        }
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  // Add this method in your component class
  checkAnswer() {
    const selectedOptions =
      this.correctAnswers[this.answer_content[this.currentQuizIndex].ques_id];
    if (selectedOptions.includes(this.selectedOption)) {
      this.showAnswer = false;
      this.showAnswerWrong = true;
    } else {
      this.showAnswer = true;
      this.showAnswerWrong = false;
    }
  }
}
