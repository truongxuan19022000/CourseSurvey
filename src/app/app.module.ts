import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import {CourseService} from "./services/course.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./services/guards/auth.guard";
import { LoginComponent } from './components/login/login.component';
import { SurveyComponent } from './components/survey/survey.component';
import { SuveyUsersComponent } from './components/suvey-users/suvey-users.component';
import {QuestionsService} from "./services/questions.service";
import { ChangeBgDirective } from './change-bg.directive';

const appRoutes: Routes =[
  {
    path : '',
    component : HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'survey',
    component: SuveyUsersComponent
  },
  {
    path: 'surveyContent',
    component: SurveyComponent
  },
  {
    path : 'courses',
    component : CoursesComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path: '',
        component: CourseListComponent
      },
      {
        path: ':id/edit',
        component: CourseEditComponent
      },
      {
        path: 'add',
        component: CourseAddComponent
      }

    ]
  }

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseEditComponent,
    LoginComponent,
    SurveyComponent,
    SuveyUsersComponent,
    ChangeBgDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot()
  ],
  providers: [
    CourseService,
    AuthGuard,
    QuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
