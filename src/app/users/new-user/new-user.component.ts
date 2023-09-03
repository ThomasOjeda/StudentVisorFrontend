import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  TagData,
  TagsRequestResponse,
} from 'src/app/model/tags-request-response';
import { UserData } from 'src/app/model/users-request-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  newUserForm = new FormGroup({
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>('', [Validators.required]),
    username: new FormControl<string | null>('', [Validators.required]),
    tags: new FormControl<string[] | null>([]),
    role: new FormControl<string | null>('reader', [Validators.required]),
  });

  allTags: TagData[] = [];

  allRoles: string[] = ['reader', 'admin'];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  @Input() newUserCommand!: Subject<string>;

  constructor(
    private authServ: AuthenticationService,
    private tagsServ: TagsService
  ) {
    tagsServ.getTags().subscribe({
      next: (response: TagsRequestResponse) => {
        if (response.result.length > 0) {
          this.allTags = response.result;
          //Reposition the public tag in case it is not in the first position
          let i = this.allTags.findIndex((tag: TagData) => tag._id == 'PUBLIC');
          //Check if public tag is present
          if (i != -1) {
            let publicTag = this.allTags[i];
            this.allTags.splice(i, 1);
            this.allTags.unshift(publicTag);
          }
        } else this.allTags = [];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authServ.registerUser(this.newUserForm.value as UserData).subscribe({
      next: (registerResponse: any) => {},
      error: (error: HttpErrorResponse) => {
        if (error.status == 409)
          window.alert(
            'No se ha podido registrar el usuario. Existe un usuario registrado con la misma dirección de correo.'
          );
      },
      complete: () => {
        window.alert('Registrado');
        this.newUserCommand.next('new');
      },
    });
  }
}
