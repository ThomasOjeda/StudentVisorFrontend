import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadeLoadingSpinnerComponent } from './shade-loading-spinner/shade-loading-spinner.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ListCommandsComponent } from './list-commands/list-commands.component';
import { ConfirmationCardComponent } from './confirmation-card/confirmation-card.component';
import { ElementAnchorDirective } from './element-anchor/element-anchor.directive';
import { UserButtonComponent } from './user-button/user-button.component';
import { EditableTextFieldComponent } from './editable-text-field/editable-text-field.component';
import { FormsModule } from '@angular/forms';
import { ExcelFileInputComponent } from './excel-file-input/excel-file-input.component';

@NgModule({
  declarations: [
    ShadeLoadingSpinnerComponent,
    ListCommandsComponent,
    ConfirmationCardComponent,
    ElementAnchorDirective,
    UserButtonComponent,
    EditableTextFieldComponent,
    ExcelFileInputComponent,
  ],
  imports: [CommonModule, MaterialDesignModule, FormsModule],
  exports: [
    ShadeLoadingSpinnerComponent,
    ListCommandsComponent,
    ConfirmationCardComponent,
    ElementAnchorDirective,
    UserButtonComponent,
    EditableTextFieldComponent,
  ],
})
export class SharedModule {}
