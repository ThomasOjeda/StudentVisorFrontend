import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { User } from 'src/app/interfaces/users-request-response';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  newUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl<string | null>('', [Validators.required]),
    username: new FormControl<string | null>('', [Validators.required]),
    tags: new FormControl<string | null>(''),
    role: new FormControl<string | null>('reader', [Validators.required]),
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]> | undefined;
  tags: string[] = [];
  allTags: string[] = ['public', 'exa', 'vet', 'eco', 'hum', 'ing'];

  allRoles: string[] = ['reader', 'admin'];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(private authServ: AuthenticationService) {
    this.filteredTags = this.newUserForm.get('tags')?.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.newUserForm.value.email &&
      this.newUserForm.value.password &&
      this.newUserForm.value.username &&
      this.newUserForm.value.role &&
      this.newUserForm.value.role
    ) {
      let newUser: User = {
        email: this.newUserForm.value.email,
        password: this.newUserForm.value.password,
        username: this.newUserForm.value.username,
        role: this.newUserForm.value.role,
        tags: [''],
      };
      newUser.tags = this.tags;
      console.log(newUser);
      this.authServ.registerUser(newUser).subscribe({
        next: (registerResponse: any) => {},
        error: (error: HttpErrorResponse) => {
          window.alert('No se ha podido registrar el usuario. Verifique no existe un usuario registrado con la misma dirección de correo.')
        },
        complete: () => {
          window.alert('registrado')
        },
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();

    this.newUserForm.get('tags')?.setValue('');
  }

  remove(index: number): void {
    this.tags.splice(index, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.newUserForm.get('tags')?.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }
}
