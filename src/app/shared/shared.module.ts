import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadeLoadingSpinnerComponent } from './shade-loading-spinner/shade-loading-spinner.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ListCommandsComponent } from './list-commands/list-commands.component';
import { ConfirmationCardComponent } from './confirmation-card/confirmation-card.component';

@NgModule({
  declarations: [
    ShadeLoadingSpinnerComponent,
    ListCommandsComponent,
    ConfirmationCardComponent,
  ],
  imports: [CommonModule, MaterialDesignModule],
  exports: [
    ShadeLoadingSpinnerComponent,
    ListCommandsComponent,
    ConfirmationCardComponent,
  ],
})
export class SharedModule {}
