import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TagData } from 'src/app/model/tag-data';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';
import { TagsRequestResponse } from '../models/tags-request-response';
import { TagsService } from '../services/tags.service';

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
  constructor(
    private tagsServ: TagsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

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
    this.tagsServ.getTags().subscribe({
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

  openDetails(tag: TagData) {
    this.router.navigate(['home', 'tags', tag._id]);
  }

  ngOnDestroy(): void {
    this.tagEventSubscription.unsubscribe();
  }
}
