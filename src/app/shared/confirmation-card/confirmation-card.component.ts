import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-card',
  templateUrl: './confirmation-card.component.html',
  styleUrls: ['./confirmation-card.component.css'],
})
export class ConfirmationCardComponent implements OnInit {
  @Output() result: EventEmitter<string> = new EventEmitter<string>();
  @Input() title!: string;
  @Input() op1!: string;
  @Input() op2!: string;
  waiting: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  option1() {
    this.waiting = true;
    this.result.emit(this.op1);
  }
  option2() {
    this.waiting = true;
    this.result.emit(this.op2);
  }
}
