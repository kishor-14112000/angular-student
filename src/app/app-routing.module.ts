import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { LetsStartComponent } from './lets-start/lets-start.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { StackblitzComponent } from './stackblitz/stackblitz.component';
import { LearnComponent } from './learn/learn.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { PracticeComponent } from './practice/practice.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },

    { path:'home', component: HomeComponent },

    { path:'learns', component: CoursesComponent },

    { path:'start', component: LetsStartComponent },
    
    { path: 'content/:module_no/:content_id', component: CourseContentComponent },

    { path:'about-course', component: AboutCourseComponent },

    { path:'practice', component: StackblitzComponent },

    { path:'checking', component: PracticeComponent },

    { path:'learn', component: LearnComponent },

    { path:'interactive', component: InteractiveComponent },

    { path:'quiz/:module_no/:content_id', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
