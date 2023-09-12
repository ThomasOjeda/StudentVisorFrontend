import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadeLoadingSpinnerComponent } from './shade-loading-spinner/shade-loading-spinner.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ListCommandsComponent } from './list-commands/list-commands.component';
import { ConfirmationCardComponent } from './confirmation-card/confirmation-card.component';
import { ElementAnchorDirective } from './element-anchor/element-anchor.directive';

@NgModule({
  declarations: [
    ShadeLoadingSpinnerComponent,
    ListCommandsComponent,
    ConfirmationCardComponent,
    ElementAnchorDirective,
  ],
  imports: [CommonModule, MaterialDesignModule],
  exports: [
    ShadeLoadingSpinnerComponent,
    ListCommandsComponent,
    ConfirmationCardComponent,
    ElementAnchorDirective,
  ],
})
export class SharedModule {}
