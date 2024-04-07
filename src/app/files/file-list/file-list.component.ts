import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileData } from '../../model/file-data';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';
import { FilesRequestResponse } from '../model/files-request-response';
import { FilesService } from '../services/files.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
})
export class FileListComponent implements OnInit {
  dataSource!: MatTableDataSource<FileData>;

  columnsToDisplay = ['name', 'type', 'year'];

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() newFileEvent!: Observable<string>;

  constructor(private router: Router, private filesServ: FilesService) {}

  ngOnInit(): void {
    this.newFileEvent.subscribe((event) => {
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
    this.filesServ.getFiles().subscribe({
      next: (response: FilesRequestResponse) => {
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

  openDetails(file: FileData) {
    this.router.navigate(['home', 'files', file._id]);
  }
}
