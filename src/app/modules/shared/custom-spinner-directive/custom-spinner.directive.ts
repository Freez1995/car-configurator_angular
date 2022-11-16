import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCustomSpinner]',
})
export class CustomSpinnerDirective implements AfterViewInit {
  @Input() color: string = '';

  constructor(private elem: ElementRef) {}

  ngAfterViewInit() {
    console.log(this.color);
    if (!!this.color) {
      const element = this.elem.nativeElement;
      const circle = element.querySelector('circle');
      circle.style.stroke = this.color;
    }
  }
}
