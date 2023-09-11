import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TagData } from 'src/app/model/tag-data';
import { TagRequestResponse } from '../models/tag-request-response';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.css'],
})
export class TagDetailsComponent implements OnInit {
  tag!: TagData;

  constructor(
    private actRoute: ActivatedRoute,
    private tagsServ: TagsService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe({
      next: (params: Params) => {
        this.requestTagData(params);
      },
      error: () => {},
      complete: () => {},
    });
  }

  requestTagData(params: Params) {
    this.tagsServ.getTag(params['id']).subscribe({
      next: (tag: TagRequestResponse) => {
        this.tag = tag.result;
      },
      error: () => {},
      complete: () => {},
    });
  }
}
