import { Component, OnInit,OnDestroy } from '@angular/core';
import {Courses} from "../../models/Courses";
import {CourseService} from "../../services/course.service";
import { Subscription } from "rxjs";
import {Router, ActivatedRoute, Params} from "@angular/router";
@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit,OnDestroy {
  public course : Courses;
  public Subscription: Subscription;
  public SubscriptionParams: Subscription;
  constructor(
    public courseService: CourseService,
    public routeService: Router,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.course = new Courses();
    this.loadata();
  }
  ngOnDestroy(): void {
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
    if(this.SubscriptionParams){
      this.SubscriptionParams.unsubscribe();
    }
  }

  editForm() {
    this.Subscription = this.courseService.updateCourse(this.course).subscribe((data: Courses)=>{
        this.courseService.showSuccess("Edit successfully","Message Edit");
        this.routeService.navigate(['courses']);
    })
  }

  private loadata() {
    this.activeRoute.params.subscribe((data:Params)=>{
      this.Subscription = this.courseService.getCourse(data['id']).subscribe((_courses: Courses) =>{
        this.course=_courses;
        console.log(this.course);
      });
    });
  }
}
