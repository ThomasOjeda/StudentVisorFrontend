import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserData } from 'src/app/model/user-data';
import { UserRequestResponse } from '../model/user-request-response';
import { UsersService } from '../services/users.service';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user!: UserData;

  constructor(
    private actRoute: ActivatedRoute,
    private usersServ: UsersService,
    private dialog: MatDialog,
    private router: Router
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

  openDeleteDialog() {
    let dialogRef = this.dialog.open(ConfirmationCardComponent);
    dialogRef.componentInstance.title = `¿Borrar el usuario ${this.user.username}?`;

    dialogRef.componentInstance.op1 = 'Borrar';
    dialogRef.componentInstance.op2 = 'Cancelar';
    dialogRef.componentInstance.result.subscribe((result) => {
      if (result == 'Borrar') {
        this.usersServ.deleteUser(this.user._id).subscribe({
          next: () => {},
          error: () => {
            window.alert('No se pudo eliminar el usuario');
            dialogRef.close();
          },
          complete: () => {
            dialogRef.close();
            this.router.navigate(['home', 'users']);
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }

  tagsModified(newValue: string[]) {
    this.user.tags = newValue;
    this.usersServ.updateUser(this.user._id, this.user).subscribe((res) => {
      this.user = res.result
    })
  }
}
