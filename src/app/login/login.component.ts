import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inputs!: NodeListOf<HTMLInputElement>;
  toggle_btn!: NodeListOf<HTMLButtonElement>;
  main!: HTMLElement;
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.inputs = document.querySelectorAll<HTMLInputElement>(".input-field");
    this.toggle_btn = document.querySelectorAll<HTMLButtonElement>(".toggle");
    this.main = document.querySelector<HTMLElement>("main")!;

    this.inputs.forEach((inp) => {
      inp.addEventListener("focus", () => {
        inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
      });
    });

    this.toggle_btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.main.classList.toggle("sign-up-mode");
      });
    });   
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  navigateDashboard()
  {
    this.router.navigate(['/home']);
  } 
}