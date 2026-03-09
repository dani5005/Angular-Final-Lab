import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightUser]',
  standalone: true
})
export class HighlightUserDirective implements OnInit {

  @Input() username!: string;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {}

  ngOnInit(){

    const firstLetter = this.username?.charAt(0).toLowerCase();
    const vowels = ['a','e','i','o','u'];

    if(vowels.includes(firstLetter)){
      this.renderer.setStyle(
        this.el.nativeElement,
        'backgroundColor',
        'gold'
      );
    }

  }

}