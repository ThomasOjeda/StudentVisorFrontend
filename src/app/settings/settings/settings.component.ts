import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/model/user-data';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user!: UserData;
  constructor(private usersServ: UsersService) {}

  ngOnInit(): void {
    this.usersServ.getMyUser().subscribe((user) => {
      this.user = user.result;
    });
  }
}
