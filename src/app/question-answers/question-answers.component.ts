import { Component, Input } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Question } from '../model/question/question';
import { CommonModule } from '@angular/common';
import { AnswerComponent } from '../answer/answer.component';
import { AnswerArray } from '../model/answer/answer-array';

@Component({
  selector: 'app-question-answers',
  standalone: true,
  imports: [CommonModule, AnswerComponent],
  templateUrl: './question-answers.component.html',
  styleUrl: './question-answers.component.css'
})
export class QuestionAnswersComponent {
  @Input() question!: Question;
  private questionService: QuestionService;

  answers: AnswerArray | null = null;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  ngOnInit(): void {
    this.getQuestionAnswers(this.question);
  }

  private getQuestionAnswers(question: Question): void{
    const questionId = question.id;
    this.questionService.getQuestionAnswers(questionId).subscribe({
      next: (answers) => {
        this.answers = answers;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
