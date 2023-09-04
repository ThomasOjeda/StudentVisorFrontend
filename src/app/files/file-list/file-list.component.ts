import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileData, FilesRequestResponse } from '../../model/file-data';
import { FilesService } from '../../services/files.service';

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

  constructor(private filesServ: FilesService) {}

  ngOnInit(): void {}

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
}
