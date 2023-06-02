import {Component, Input} from '@angular/core';
import {DocumentCard} from "../interfaces/data-interface";
import {DataService} from "../data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent {
  @Input() file!: DocumentCard;

  addCommentInput: boolean = false;
  addComment = new FormGroup({
    text: new FormControl('', Validators.required)
  });

  constructor(private dataService: DataService) {
  }

  downloadFile(id: string, name: string): void {
    this.dataService.downloadFile(id, name);
  }

  showAddCommentInput(): void {
    this.addCommentInput = !this.addCommentInput;
  }

  submitComment(): void {
    if (!this.addComment.valid) return;

    console.log(this.addComment.value.text);
    // @ts-ignore
    this.dataService.addComment(this.file.id, this.addComment.value.text);
    this.addComment.reset();
    this.showAddCommentInput();
  }

  submitScore(scoreForm: NgForm): void {
    if (scoreForm.value.score < 0 || scoreForm.value.score > 100) return;

    console.log(scoreForm.value.score);
    scoreForm.reset();
}
}
