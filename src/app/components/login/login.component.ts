import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error:number;
  constructor(
    public Router: Router,
    public courseService: CourseService
  ) { }

  ngOnInit(): void {
  }



  OnLogin(username: string, password:string) {
      let user = {
        username : username,
        password: password
    };
      if (username=='admin' && password== 'admin'){
        localStorage.setItem('user',JSON.stringify(user));
        this.courseService.showSuccess("Login successfully","Login Message");
        this.Router.navigate(['courses']);
      }
      else {
        this.courseService.showError("User, Password error","Error Message");
      }
  }
}
