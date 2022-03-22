import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  public name :string;
  public question: any[]=[];
  public currentQuestion:number=1;
  public points:number=0;
  counter=60;
  //dap an dung
  public correctAnswer:number=0;
  public incorrectAnswer:number=0;
  private interval$: any;
  progress:string="0";
  constructor(
    private questionsService : QuestionsService
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestion();
    this.startCounter();

  }
  getAllQuestion(){
    this.questionsService.getQuestionJson().subscribe(data=>{
     this.question = data.questions;
      console.log(this.question);
    })
  }
  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQS:number, option:any ) {
    console.log(this.currentQuestion);
    if (option.correct){
      this.points +=10;
      //this.points = this.points + 10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },1000);

    }
    else {
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
        this.incorrectAnswer++;
      },1000);
      this.points -=10;
      if (this.points<=0){
        this.points=0;
      }
    }
  }
  startCounter(){
    this.interval$ = interval(1000).subscribe(val=>{
      this.counter--;
      if (this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.startCounter();
        this.points-=10;
        if (this.points<=0){
          this.points=0;
        }
        this.getProgressPercent();
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },60000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  resetSurvy() {
    this.resetCounter();
    this.getAllQuestion();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }
  getProgressPercent(){
    this.progress = ((this.currentQuestion / this.question.length)*100).toString();
    console.log(this.progress);
    return this.progress;

  }
}
