import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import {
  UsersResquestResponse,
  Result,
} from '../interfaces/users-request-response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users!: UsersResquestResponse;

  dataSource!: MatTableDataSource<Result>;

  columnsToDisplay = ['username', 'email', 'role', 'tags'];

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usersServ: UsersService) {}

  ngOnInit(): void {

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
      error: () => {},
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
  
}
