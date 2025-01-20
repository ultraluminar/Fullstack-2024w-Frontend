import { Component, Input } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Question } from '../model/question/question';
import { CommonModule } from '@angular/common';
import { AnswerComponent } from '../answer/answer.component';
import { AnswerArray } from '../model/answer/answer-array';
import { AnswerFormComponent } from '../answer-form/answer-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-question-answers',
  standalone: true,
  imports: [CommonModule, AnswerComponent, AnswerFormComponent],
  templateUrl: './question-answers.component.html',
  styleUrl: './question-answers.component.css'
})
export class QuestionAnswersComponent {
  @Input() question!: Question;

  private questionService: QuestionService;
  private authService: AuthService;
  private router: Router;

  answers: AnswerArray | null = null;
  showAnswerForm = false;
  isLoggedIn = false;

  constructor(questionService: QuestionService, router: Router, authService: AuthService) {
    this.questionService = questionService;
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
    this.getQuestionAnswers(this.question);
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
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

  onAnswerSubmitted(answer: any): void {
    this.showAnswerForm = false;
    this.questionService.createAnswer(answer, this.question.id).subscribe({
      next: (answer) => {
        this.answers?.unshift(answer);
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/anmelden']);
        }
        console.log(error);
      }
    });
  }

  onDeleteAnswer(answerId: number): void {
    for (let i = 0; i < this.answers!.length; i++) {
      if (this.answers![i].id === answerId) {
        this.answers!.splice(i, 1);
        break;
      }
    }
  }
}
