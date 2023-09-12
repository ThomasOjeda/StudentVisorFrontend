import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appElementAnchor]',
})
export class ElementAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
