import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
  @Input() isCorrect : Boolean = false;
  constructor(
    private el : ElementRef,
    private reder: Renderer2
  ) { }
  @HostListener('click') answer(){
    if (this.isCorrect){
      this.reder.setStyle(this.el.nativeElement,'background','green');
      this.reder.setStyle(this.el.nativeElement,'color','#fff');
      this.reder.setStyle(this.el.nativeElement,'border','2px solid grey');

    }else {
      this.reder.setStyle(this.el.nativeElement,'background','red');
      this.reder.setStyle(this.el.nativeElement,'color','#fff');
      this.reder.setStyle(this.el.nativeElement,'border','2px solid grey  ');

    }
  }

}
