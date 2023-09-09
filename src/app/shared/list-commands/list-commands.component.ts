import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-commands',
  templateUrl: './list-commands.component.html',
  styleUrls: ['./list-commands.component.css'],
})
export class ListCommandsComponent implements OnInit {
  @Output() detailsSignal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteSignal: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  emitDetailsSignal() {
    this.detailsSignal.emit(true);
  }

  emitDeleteSignal() {
    this.deleteSignal.emit(true);
  }
}
