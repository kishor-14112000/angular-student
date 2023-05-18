import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  ind:number=0;

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('/api/courseTable');
  }

  get_course_content(mo_no:any,c_id: any){
    return this.http.get(`/api/courseContent/${mo_no}/${c_id}`);
  }

  get_course_content_count(m_id:any){
    return this.http.get(`/api/courseContentCount/${m_id}`);
  }

  get_quiz_content(moud_no:any,con_id: any){
    return this.http.get(`/api/quizDetails/${moud_no}/${con_id}`);
  }

  get_answer_content(){
    return this.http.get('/api/answerDetails');
  }

  get_content_id(content_id:any){
    return this.http.post('/api/contentId', content_id);
  }

  get_all_course_content(){
    return this.http.get('/api/fullCourseContent');
  }

  addFeedback(feedback_data:any){
    return this.http.post('/api/feedbackData', feedback_data);
  }
}
