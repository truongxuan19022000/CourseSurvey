import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Courses-Management';
  constructor(
    public router: Router
  ) {
  }
  Logout() {
    if (localStorage.getItem('user')){
      localStorage.removeItem('user');
      this.router.navigate(['login'])
    }
  }
}
