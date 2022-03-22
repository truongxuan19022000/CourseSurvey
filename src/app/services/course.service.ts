import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Courses} from "../models/Courses";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public Api : string = 'http://127.0.0.1:8000/api/courses';
  constructor(
    public http : HttpClient,
    private toastr: ToastrService
  ) { }
  getAllCourses() : Observable<any>{
      return this.http.get(this.Api);
  }
  getCourse(id: number): Observable<any>{
    return this.http.get(`${this.Api}/${id}`);
  }
  addCourse(course: Courses) : Observable<any>{
    return  this.http.post(this.Api,course);
  }
  updateCourse(course: Courses):Observable<any>{
    return this.http.put(`${this.Api}/${course.id}`,course);
  }
  deleteCourse(id: number):Observable<any>{
    return this.http.delete(`${this.Api}/${id}`);
  }
  //Hien thi Toast message
  showSuccess(message:string, title:string){
    this.toastr.success(message, title)
  }

  showError(message:string, title:string){
    this.toastr.error(message, title)
  }
}
