import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/model/user-data';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css'],
})
export class UserButtonComponent implements OnInit {
  user!: UserData;
  constructor(private userServ: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userServ.getMyUser().subscribe((user) => {
      this.user = user.result;
    });
  }

  btnClicked() {
    this.router.navigate(['home', 'settings']);
  }
}
