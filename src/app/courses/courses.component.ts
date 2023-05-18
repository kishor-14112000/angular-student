import { Component, ViewChild } from '@angular/core';
import 'bootstrap';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  myClass = 'dropdown-menu';

  just_clicked() {
    if (this.myClass === 'dropdown-menu') {
      this.myClass = 'dropdown-menu show';
    } else {
      this.myClass = 'dropdown-menu';
    }
  }

  val1: number | undefined;

    val2: number = 5;

    val3: number = 4;

    val4: number = 3;

    val5: number = 2;

    msg: string | undefined;

    
}
