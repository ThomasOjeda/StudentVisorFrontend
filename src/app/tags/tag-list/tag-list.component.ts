import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  TagData,
  TagsRequestResponse,
} from 'src/app/model/tags-request-response';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
})
export class TagListComponent implements OnInit {
  tags!: TagsRequestResponse;

  dataSource!: MatTableDataSource<TagData>;

  columnsToDisplay = ['_id', 'description'];

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() newTagEvent!: Observable<string>;
  tagEventSubscription!: Subscription;
  constructor(private usersServ: TagsService, private router: Router) {}

  ngOnInit(): void {
    this.tagEventSubscription = this.newTagEvent.subscribe((event) => {
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
    this.usersServ.getTags().subscribe({
      next: (response: TagsRequestResponse) => {
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

  openDetails(user: TagData) {
    this.router.navigate(['home', 'users', user._id]);
  }

  ngOnDestroy(): void {
    this.tagEventSubscription.unsubscribe();
  }
}
