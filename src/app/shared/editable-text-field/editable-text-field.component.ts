import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editable-text-field',
  templateUrl: './editable-text-field.component.html',
  styleUrls: ['./editable-text-field.component.css'],
})
export class EditableTextFieldComponent implements OnInit {
  editMode = false;
  @Input() isTextArea!: boolean;

  @Input() value: string | undefined;
  @Input() alternativeValue!: string;

  @Output() wasModified = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  save() {
    this.toggleEdit();
    this.wasModified.emit(this.value);
  }
}
