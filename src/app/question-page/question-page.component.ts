import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Question } from '../model/question/question';
import { QuestionService } from '../service/question.service';
import { NotFoundComponent } from "../not-found/not-found.component";
import { User } from '../model/user/user';
import { UserService } from '../service/user.service';
import { QuestionAnswersComponent } from '../question-answers/question-answers.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NotFoundComponent, QuestionAnswersComponent],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.css'
})
export class QuestionPageComponent {
  title = 'Frage';
  private questionService: QuestionService;
  private userService: UserService;
  private authService: AuthService;
  private router: Router;
  private route: ActivatedRoute;

  question: Question | null = null;
  creatorUser: User | null = null;
  currentUser: User | null = null;
  error: boolean = false;

  constructor(questionService: QuestionService, userService: UserService, authService: AuthService, router: Router, route: ActivatedRoute) {
    this.questionService = questionService;
    this.userService = userService;
    this.authService = authService;
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const questionId = parseInt(params.get('questionId') || '');
      this.getQuestion(questionId);
    });
    this.authService.getUserObservable().subscribe((user: User | null) => {
      this.currentUser = user;
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
        this.creatorUser = user;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public deleteQuestion(): void {
    if (this.currentUser && this.question?.userId === this.currentUser.id) {
      this.questionService.deleteQuestion(this.question!.id).subscribe({
        next: () => {
          this.question = null;
          this.router.navigate(['/user', this.currentUser?.id]);
        },
        error: (error) => {
          if (error.status === 401) {
            this.authService.logout();
          }
          console.log(error);
        }
      });
    }
  }
}
