import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  myClass = 'dropdown-menu';

  just_clicked() {
    if (this.myClass === 'dropdown-menu') {
      this.myClass = 'dropdown-menu show';
    } else {
      this.myClass = 'dropdown-menu';
    }
  }
}
