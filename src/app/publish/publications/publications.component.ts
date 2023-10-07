import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
})
export class PublicationsComponent implements OnInit {
  newPublicationCommand: Subject<string> = new Subject<string>();

  constructor() {}

  ngOnInit(): void {}
}
