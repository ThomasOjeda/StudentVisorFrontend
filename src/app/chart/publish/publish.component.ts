import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartType } from '../chart-type.model';
import { TransformationRequest } from 'src/app/interfaces/transformation-request';
import { ChartsService } from 'src/app/services/charts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css'],
})
export class PublishComponent implements OnInit {
  publishHeader = new FormGroup<any>({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    tags: new FormControl(),
  });
  publishStructure = new FormGroup<any>({});

  types = [
    { label: 'Movimientos de estudiantes', value: ChartType.STUDENT_MOVEMENTS },
    { label: 'Inscripciones', value: ChartType.STUDENT_INSCRIPTIONS },
  ];

  loading: boolean = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]> | undefined;
  tags: string[] = [];
  allTags: string[] = ['public', 'exa', 'vet', 'eco', 'hum', 'ing'];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(private chartService: ChartsService) {
    this.filteredTags = this.publishHeader.get('tags')?.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;

    const transformationRequest: TransformationRequest = {
      transformationHeader: this.publishHeader.value,
      transformationBody: this.publishStructure.value,
    };

    transformationRequest.transformationHeader.tags = this.tags;

    console.log(transformationRequest);

    this.chartService.requestTransformation(transformationRequest).subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        console.log('transformation request completed');
        this.loading = false;
      },
    });
  }

  typeChanged($event: string) {
    if ($event === 'STMV')
      this.publishStructure = new FormGroup({
        yearA: new FormControl(null, [Validators.required]),
        yearB: new FormControl(null, [Validators.required]),
      });
    if ($event === 'INSC')
      this.publishStructure = new FormGroup({
        year: new FormControl(null, [Validators.required]),
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();

    this.publishHeader.get('tags')?.setValue('');
  }

  remove(index: number): void {
    this.tags.splice(index, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.publishHeader.get('tags')?.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }
}
