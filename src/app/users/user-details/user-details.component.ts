import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserData } from 'src/app/model/user-data';
import { UsersService } from 'src/app/services/users.service';
import { UserRequestResponse } from '../model/user-request-response';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user!: UserData;

  constructor(
    private actRoute: ActivatedRoute,
    private usersServ: UsersService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe({
      next: (params: Params) => {
        this.requestUserData(params);
      },
      error: () => {},
      complete: () => {},
    });
  }

  requestUserData(params: Params) {
    this.usersServ.getUser(params['id']).subscribe({
      next: (user: UserRequestResponse) => {
        this.handleUserData(user);
      },
      error: () => {},
      complete: () => {},
    });
  }

  handleUserData(user: UserRequestResponse) {
    this.user = user.result;
  }
}
