import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateAnswer } from '../model/answer/create-answer';
import { Question } from '../model/question/question';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-answer-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './answer-form.component.html',
  styleUrl: './answer-form.component.css'
})
export class AnswerFormComponent {
  @Input() question!: Question;
  @Output() answerSubmitted = new EventEmitter<CreateAnswer>();

  answerBody: string = '';

  submitAnswer(): void {
    const answer: CreateAnswer = {
      body: this.answerBody
    };
    this.answerSubmitted.emit(answer);
    this.answerBody = '';
  }
}
