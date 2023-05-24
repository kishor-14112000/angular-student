import {Component,ElementRef,ViewChild,OnDestroy,HostListener} from '@angular/core';
import { saveAs } from 'file-saver';
import Quill from 'quill';
import { QuillEditorComponent } from 'ngx-quill';
import { GeneralServiceService } from '../service/general-service.service';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
  providers: [MessageService],
})
export class CourseContentComponent implements OnDestroy {
  @ViewChild('dropdownBtn') dropdownBtn!: ElementRef;
  @ViewChild('editor') editor!: QuillEditorComponent;
  @ViewChild('videoElement') videoElement: any;
  dropdownOpen = false;
  loading: boolean = true;
  showIndicator = false;
  conform_msg: string = `Amazing!`;
  typingMessage: string = '';
  typingMessage2: string = '';
  showButton: boolean = false;
  typingComplete!: boolean;
  showNextCards: boolean = false;
  AllData: any;
  learn_content: any;
  desiredIndex = 0;
  sidebarVisible2!: boolean;
  showTranscriptFlag = false;
  showNextButton = true;
  endedSubscription: any;
  videoEndedForFirstTime = false;
  showNextAllDiv = false;
  currentQuizIndex = 0;
  currentIndex = 0;
  current_question_index = 0;
  isLoading = false;
  loaded = false;
  //abt quiz
  showAnswer = false;
  showAnswerWrong = false;
  correct_answer = false;
  ingredient!: string;
  selectedOption: any = '';
  isOptionSelected: boolean = false;
  isAnyOptionSelected!: boolean;
  quiz_content: any;
  answer_content: any;
  all_course_content: any;
  content_data: any;
  ans: any[] = [];
  showCheckboxQuiz: boolean = false;
  showRadioQuiz: boolean = false;
  currentArray: any;
  currentArrayIndex: number = 0;
  currentQuestionIndex = 0;
  moduleNo: any;
  contentNo: any;
  quesId: any;
  content_id: any;
  ques_id: any;
  current_content_id: any;
  f_subject: any;
  f_feedback: any;

  constructor(
    private service: GeneralServiceService,
    private elRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.showButton = false;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.moduleNo = params.get('module_no');
      this.contentNo = params.get('content_no');
      this.quesId = params.get('ques_id');
      this.getDataFromAPI();
      this.getContentDataAPI();
      this.getQuizData();
      this.getAnswerData();
      this.getFullContentData();
      this.get_content_count();
    });
  }

  showTranscript() {
    this.showTranscriptFlag = !this.showTranscriptFlag;
  }

  quillModules = {};

  exportText() {
    const quill = new Quill(this.editor.editorElem);
    const text = quill.getText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'document.txt');
  }

  playVideo() {
    this.videoElement.nativeElement.play();
  }

  pauseVideo() {
    this.videoElement.nativeElement.pause();
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
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

  displayNextArray() {
    this.currentArrayIndex++;
    if (this.currentArrayIndex < this.AllData.length) {
      this.currentArray = this.AllData[this.currentArrayIndex];
    } else {
      this.showNextAllDiv = true;
    }
  }

  //get data

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

  getContentDataAPI() {
    this.service.get_course_content(this.moduleNo, this.contentNo).subscribe(
      (response: any) => {
        this.content_data = response.data;
        console.log(this.content_data, 'Content data');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  onVideoEnded() {
    if (!this.videoEndedForFirstTime) {
      this.videoEndedForFirstTime = true;
      this.showNextButton = false;
    }
    const video = this.videoElement.nativeElement as HTMLVideoElement;
    video.controls = true;
    this.endedSubscription = video.removeEventListener(
      'ended',
      this.onVideoEnded.bind(this)
    );
  }

  onNoClicked() {
    this.router.navigate(['https://angular.io/docs']);
  }

  ngOnDestroy() {
    if (this.endedSubscription) {
      this.endedSubscription.unsubscribe();
    }
  }

  //abt quiz

  checked!: boolean;
  isChecked: boolean = false;
  isCheckBoxSelected: boolean = false;
  onCheckBoxChange() {
    this.isCheckBoxSelected = this.ans.some(
      (checkbox: { checked: any }) => checkbox.checked
    );
  }

  onNextClicked() {
    if (this.currentQuizIndex < this.answer_content.length + 1) {
      this.currentQuizIndex++;
      this.showNextAllDiv = true;
    }
  }

  previousQuestion() {
    if (this.currentQuizIndex > 0) {
      this.currentQuizIndex--;
    }
  }

  finishQuiz() {
    if (this.current_question_index < this.quiz_content.length - 1) {
      this.current_question_index++;
      this.showNextAllDiv = false;
    }
  }

  updateSelection(): void {
    this.isAnyOptionSelected = this.selectedOption !== null;
  }

  AfterSuccess() {
    this.correct_answer = true;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.quiz_content.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  sendContentId() {
    this.content_id = this.quiz_content.content_id;
    console.log(this.content_id, 'CID');

    this.service
      .get_content_id({ content_id: JSON.stringify(this.content_id) })
      .subscribe((response) => {
        console.log(response, 'content_id');
      });
  }

  reloadAndFadeIn() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate([`/quiz/${this.moduleNo}/${this.contentNo}`]);
    }, 2000);
  }

  downloadZip() {
    const url = '/home/kishor/ques.zip';
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      saveAs(blob, 'myfile.zip');
    });
  }

  getQuizData() {
    this.service.get_quiz_content(this.moduleNo, this.contentNo).subscribe(
      (response: any) => {
        this.quiz_content = response.data[0];
        this.loaded = true;
        console.log(this.quiz_content, 'Quiz datas');
        console.log(this.quiz_content.course_id, 'Quiz datas');
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
        localStorage.setItem(
          'answer_content',
          JSON.stringify(this.answer_content)
        );
        console.log(this.answer_content, 'Answer datas');
        for (let i = 0; i < this.answer_content.length; i++) {
          this.ans[i] = this.answer_content[i].options.split(',');
        }
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  get_content_count() {
    this.service.get_course_content_count(this.moduleNo).subscribe(
      (response: any) => {},
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  getFullContentData() {
    this.service.get_all_course_content().subscribe(
      (response: any) => {
        this.all_course_content = response.data;
        console.log(this.all_course_content, 'all content datas');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Downloading!',
      detail: 'Complete Course Material',
    });
  }
}