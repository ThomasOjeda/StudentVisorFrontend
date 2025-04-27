import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagData } from 'src/app/model/tag-data';
import { TagsService } from 'src/app/tags/services/tags.service';

@Component({
  selector: 'app-modifiable-tags',
  templateUrl: './modifiable-tags.component.html',
  styleUrl: './modifiable-tags.component.css'
})
export class ModifiableTagsComponent {
  editMode = false;

  @Input() tags: string[] = [];

  @Output() wasModified = new EventEmitter<string[]>();

  allTags: string[] = [];
  
  constructor(private tagsServ: TagsService) {}

  ngOnInit(): void {
    this.tagsServ.getTags().subscribe({
      next: (tags) => {
        this.allTags = tags.result.map((tag: TagData) => tag._id);
      }
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  save() {
    this.toggleEdit();
    this.wasModified.emit(this.tags);
  }
}
