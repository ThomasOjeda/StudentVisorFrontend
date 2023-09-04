import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileData, FileRequestResponse } from 'src/app/model/file-data';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css'],
})
export class FileDetailsComponent implements OnInit {
  file!: FileData;

  constructor(
    private actRoute: ActivatedRoute,
    private filesServ: FilesService
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
    this.filesServ.getFile(params['id']).subscribe({
      next: (file: FileRequestResponse) => {
        this.handleUserData(file);
      },
      error: () => {},
      complete: () => {},
    });
  }

  handleUserData(file: FileRequestResponse) {
    this.file = file.result;
  }
}
