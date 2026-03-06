
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightUser]',
  standalone: true
})
export class HighlightUserDirective implements OnInit{

  @Input() username!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(){
    const first = this.username?.charAt(0).toLowerCase();
    if(['a','e','i','o','u'].includes(first)){
      this.el.nativeElement.style.backgroundColor = 'gold';
    }
  }
}
