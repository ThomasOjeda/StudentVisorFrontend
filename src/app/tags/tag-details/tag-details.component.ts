import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TagData } from 'src/app/model/tag-data';
import { TagRequestResponse } from '../models/tag-request-response';
import { TagsService } from '../services/tags.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationCardComponent } from 'src/app/shared/confirmation-card/confirmation-card.component';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.css'],
})
export class TagDetailsComponent implements OnInit {
  tag!: TagData;

  constructor(
    private actRoute: ActivatedRoute,
    private tagsServ: TagsService,
    private dialog: MatDialog,
    private router: Router
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

  openDeleteDialog() {
    let dialogRef = this.dialog.open(ConfirmationCardComponent);
    dialogRef.componentInstance.title = `¿Borrar la etiqueta ${this.tag._id}?`;

    dialogRef.componentInstance.op1 = 'Borrar';
    dialogRef.componentInstance.op2 = 'Cancelar';
    dialogRef.componentInstance.result.subscribe((result) => {
      if (result == 'Borrar') {
        this.tagsServ.deleteTag(this.tag).subscribe({
          next: () => {},
          error: () => {
            window.alert(
              'No se pudo eliminar la etiqueta. ¿Esta siendo usada por algun grafico?'
            );
            dialogRef.close();
          },
          complete: () => {
            dialogRef.close();
            this.router.navigate(['home', 'tags']);
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }

  descriptionModified(newValue: string) {
    this.tag.description = newValue
    this.tagsServ.updateTag(this.tag).subscribe((res) => {
      this.tag = res.result;
    });
  }
}
