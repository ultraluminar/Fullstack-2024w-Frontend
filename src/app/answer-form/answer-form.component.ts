import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateAnswer } from '../model/answer/create-answer';
import { Question } from '../model/question/question';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './answer-form.component.html',
  styleUrl: './answer-form.component.css'
})
export class AnswerFormComponent {
  @Input() question!: Question;
  @Output() answerSubmitted = new EventEmitter<CreateAnswer>();

  answerBody: string = '';
  errorMessage: string | null = null;

  submitAnswer(answerForm: NgForm): void {
    if (answerForm.invalid) {
      const errors = answerForm.controls;
      for (const name in errors) {
        if (errors[name].errors) {
          if (errors[name].errors['required']) {
            this.errorMessage = 'Bitte gebe eine Antwort ein.';
            return;
          }
          if (errors[name].errors['minlength']) {
            this.errorMessage = `Die Antwort muss mindestens ${errors[name].errors['minlength'].requiredLength} Zeichen lang sein.`;
            return;
          }
        }
      }
    }
    const answer: CreateAnswer = {
      body: this.answerBody
    };
    this.answerSubmitted.emit(answer);
    this.answerBody = '';
  }
}
