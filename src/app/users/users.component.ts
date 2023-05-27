import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UsersResquestResponse } from '../interfaces/users-request-response';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: UsersResquestResponse;
  constructor(private usersServ: UsersService) { }

  ngOnInit(): void {
    this.usersServ.getUsers().subscribe({

      next: (response: UsersResquestResponse) => {
        this.users = response
      }
      ,
      error: () => {},
      complete: () => {}

    })
  }

}
