import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileData } from 'src/app/model/file-data';
import { FileRequestResponse } from '../model/file-request-response';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css'],
})
export class FileDetailsComponent implements OnInit {
  file!: FileData;
  editMode = false;

  constructor(
    private actRoute: ActivatedRoute,
    private filesServ: FilesService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe({
      next: (params: Params) => {
        this.requestFileData(params);
      },
      error: () => {},
      complete: () => {},
    });
  }

  requestFileData(params: Params) {
    this.filesServ.getFile(params['id']).subscribe({
      next: (file: FileRequestResponse) => {
        this.file = file.result;
      },
      error: () => {},
      complete: () => {},
    });
  }

  descriptionModified(newValue: string) {
    this.file.description = newValue;
    this.filesServ
      .patchFile(this.file._id, { description: newValue })
      .subscribe((res) => {
        this.file = res.result;
      });
  }

  nameModified(newValue: string) {
    this.file.name = newValue;
    this.filesServ
      .patchFile(this.file._id, { name: newValue })
      .subscribe((res) => {
        this.file = res.result;
      });
  }
}
