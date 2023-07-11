import { Directive, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appScrollBottom]'
})
export class ScrollBottomDirective implements AfterViewChecked {
  constructor(private el: ElementRef) {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      // Scroll to the bottom of the element
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
