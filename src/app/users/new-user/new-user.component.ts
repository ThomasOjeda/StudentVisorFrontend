import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Tag,
  TagsRequestResponse,
} from 'src/app/interfaces/tags-request-response';
import { User } from 'src/app/interfaces/users-request-response';
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

  allTags!: Tag[];

  allRoles: string[] = ['reader', 'admin'];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private authServ: AuthenticationService,
    private tagsServ: TagsService
  ) {
    tagsServ.getTags().subscribe({
      next: (response: TagsRequestResponse) => {
        this.allTags = response.result;
        //Reposition the public tag in case it is not in the first position
        let i = this.allTags.findIndex((tag: Tag) => tag._id == 'PUBLIC');
        let publicTag = this.allTags[i];
        this.allTags.splice(i, 1);
        this.allTags.unshift(publicTag);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authServ.registerUser(this.newUserForm.value as User).subscribe({
      next: (registerResponse: any) => {},
      error: (error: HttpErrorResponse) => {
        window.alert(
          'No se ha podido registrar el usuario. Verifique no existe un usuario registrado con la misma dirección de correo.'
        );
      },
      complete: () => {
        window.alert('Registrado');
      },
    });
  }
}
