import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TagData } from 'src/app/model/tags-request-response';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-new-tag',
  templateUrl: './new-tag.component.html',
  styleUrls: ['./new-tag.component.css'],
})
export class NewTagComponent implements OnInit {
  @Input() newTagCommand!: Subject<string>;

  newTagForm = new FormGroup({
    _id: new FormControl<string | null>('', [Validators.required]),
    description: new FormControl<string | null>('', [Validators.required]),
  });

  constructor(private tagsServ: TagsService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.tagsServ.addTag(this.newTagForm.value as TagData).subscribe({
      next: (registerResponse: any) => {},
      error: (error: HttpErrorResponse) => {
        window.alert('No se ha podido registrar la etiqueta.');
      },
      complete: () => {
        window.alert('Etiqueta agregada');
        this.newTagCommand.next('new');
      },
    });
  }
}
