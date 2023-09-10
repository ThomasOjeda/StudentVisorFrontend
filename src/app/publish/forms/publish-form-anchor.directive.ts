import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPublishFormAnchor]',
})
export class PublishFormAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
