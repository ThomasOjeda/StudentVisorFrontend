import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserData } from 'src/app/model/user-data';
import { UsersService } from 'src/app/services/users.service';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';
import { UsersResquestResponse } from '../model/users-request-response';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  users!: UsersResquestResponse;

  dataSource!: MatTableDataSource<UserData>;

  columnsToDisplay = ['username', 'role', 'tags', 'actions'];

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() newUserEvent!: Observable<string>;
  userEventSubscription!: Subscription;
  constructor(
    private usersServ: UsersService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userEventSubscription = this.newUserEvent.subscribe((event) => {
      if (event == 'new') {
        this.refresh();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.refresh();
  }

  refresh() {
    this.isLoadingResults = true;
    this.usersServ.getUsers().subscribe({
      next: (response: UsersResquestResponse) => {
        this.dataSource.data = response.result;
      },
      error: () => {
        this.isLoadingResults = false;
      },
      complete: () => {
        this.isLoadingResults = false;
      },
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(user: UserData) {
    this.router.navigate(['home', 'users', user._id]);
  }

  handleDeleteSignal(user: UserData) {
    let dialogRef = this.dialog.open(ConfirmationCardComponent);
    dialogRef.componentInstance.title = `¿Borrar el usuario ${user.username}?`;

    dialogRef.componentInstance.op1 = 'Borrar';
    dialogRef.componentInstance.op2 = 'Cancelar';
    dialogRef.componentInstance.result.subscribe((result) => {
      if (result == 'Borrar') {
        this.usersServ.deleteUser(user._id).subscribe({
          next: () => {},
          error: () => {},
          complete: () => {
            dialogRef.close();
            this.refresh();
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.userEventSubscription.unsubscribe();
  }
}
