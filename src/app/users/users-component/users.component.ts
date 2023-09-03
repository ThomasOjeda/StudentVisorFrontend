import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  newUserCommand = new Subject<string>();
  constructor() {}
}
