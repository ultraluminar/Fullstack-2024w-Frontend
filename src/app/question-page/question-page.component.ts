import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Question } from '../model/question/question';
import { QuestionService } from '../service/question.service';
import { NotFoundComponent } from "../not-found/not-found.component";
import { User } from '../model/user/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NotFoundComponent],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.css'
})
export class QuestionPageComponent {
  title = 'Frage';
  private questionService: QuestionService;
  private userService: UserService;
  private route: ActivatedRoute;

  question: Question | null = null;
  user: User | null = null;
  error: boolean = false;

  constructor(questionService: QuestionService, userService: UserService, route: ActivatedRoute) {
    this.questionService = questionService;
    this.userService = userService;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const questionId = parseInt(params.get('questionId') || '');
      this.getQuestion(questionId);
    });
  }

  private getQuestion(questionId: number): void {
    if (isNaN(questionId)) {
      this.error = true;
      return;
    }
    this.questionService.getQuestion(questionId).subscribe({
      next: (question) => {
        this.error = false;
        this.question = question;
        this.getUserFromQuestion();
      },
      error: (error) => {
        this.error = true;
      }
    });
  }

  private getUserFromQuestion(): void {
    if (!this.question) {
      return;
    }
    this.userService.getUser(this.question!.userId).subscribe({
      next: (user) => {
        this.user = user;
        console.log(user);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
