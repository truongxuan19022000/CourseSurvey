import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-suvey-users',
  templateUrl: './suvey-users.component.html',
  styleUrls: ['./suvey-users.component.css']
})
export class SuveyUsersComponent implements OnInit {
  @ViewChild('name') nameKey !: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  StartServey() {
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }
}
