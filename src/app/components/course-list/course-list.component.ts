import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../services/course.service";
import {Courses} from "../../models/Courses";
import {Subscription} from "rxjs";
import 'lodash' ;
declare var _:any;
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  public courses : Courses[]=[];
  public Subscription: Subscription;
  public name:string;
  constructor(
    public courseService : CourseService
  ) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(data =>{
        this.courses=data;
      console.log(data);
    });
  }

  onDelete(id: number) {
    this.Subscription=this.courseService.deleteCourse(id).subscribe(data=>{
      this.updateTable(id);
      this.courseService.showSuccess("Delete successfully","Message");
    });
  }

  private updateTable(id: number) {
    for (let i = 0; i <this.courses.length; i++) {
        if(this.courses[i].id == id){
          this.courses.splice(i,1);
          break;
        }
    }
  }

  sortByName() {
    this.courses =_.orderBy(this.courses,['courses','name'],[ 'name','desc']);
  }

  sortByPrice() {
     this.courses =_.orderBy(this.courses,['courses','fee'],[ 'fee','desc']);
     this.courses =_.orderBy(this.courses,['courses','fee'],[ 'fee','desc']);
  }
  Search(){
    if(this.name == ""){
      this.ngOnInit();
    }
    else {
      this.courses = this.courses.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }
}
