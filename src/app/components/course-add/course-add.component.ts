import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Courses} from "../../models/Courses";
import {CourseService} from "../../services/course.service";
import { Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit,OnDestroy {
  public courses : Courses;
  public Subscription: Subscription;
  AddForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    description: new FormControl('',[Validators.minLength(5)]),
    fee:new FormControl('',[Validators.required])
  });
  constructor(
    public courseService: CourseService,
    public routeService: Router
  ) { }
  ngOnDestroy(): void {
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.courses = new Courses();
  }
  get name(){
    return this.AddForm.get('name');
  }
  get description(){
    return this.AddForm.get('description');
  }
  get fee(){
    return this.AddForm.get('fee');
  }

  AddFormClick() {
    this.Subscription= this.courseService.addCourse(this.courses).subscribe(data=> {
      if (data && data.id){
        this.routeService.navigate(['courses']);
        //mesage
        this.courseService.showSuccess("Data shown successfully !!", "Message Add ");
      }
      else {
        this.courseService.showError("Data Error", "Message");
      }
    });
  }
}
