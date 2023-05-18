import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutCourseComponent } from './about-course/about-course.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LetsStartComponent } from './lets-start/lets-start.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PracticeComponent } from './practice/practice.component';
import { StackblitzComponent } from './stackblitz/stackblitz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RatingModule } from 'primeng/rating';
import { AccordionModule } from 'primeng/accordion';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { LearnComponent } from './learn/learn.component';
import { SplitterModule } from 'primeng/splitter';
import { DragDropModule } from 'primeng/dragdrop';
import { SidebarModule } from 'primeng/sidebar';
import { InteractiveComponent } from './interactive/interactive.component';
import { QuillModule } from 'ngx-quill';
import { TooltipModule } from 'primeng/tooltip';
import { QuizComponent } from './quiz/quiz.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    AppComponent,
    AboutCourseComponent,
    AboutUsComponent,
    CourseContentComponent,
    CoursesComponent,
    HomeComponent,
    LetsStartComponent,
    LoginComponent,
    NavbarComponent,
    PracticeComponent,
    StackblitzComponent,
    LearnComponent,
    InteractiveComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    AvatarModule,
    AvatarGroupModule,
    RatingModule,
    AccordionModule,
    HttpClientModule,
    ProgressBarModule,
    ToastModule,
    SplitterModule,
    DragDropModule,
    SidebarModule,
    QuillModule,
    TooltipModule,
    CheckboxModule,
    TagModule,
    TabViewModule,
    RadioButtonModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
