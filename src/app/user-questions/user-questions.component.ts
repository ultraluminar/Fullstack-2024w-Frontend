import { Component, Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { QuestionArray } from '../model/question/question-array';
import { User } from '../model/user/user';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-user-questions',
  standalone: true,
  imports: [CommonModule, QuestionComponent],
  templateUrl: './user-questions.component.html',
  styleUrl: './user-questions.component.css'
})
export class UserQuestionsComponent {
  @Input() user!: User;
  private userService: UserService;

  questions: QuestionArray | null = null;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getUserQuestion(this.user);
  }

  private getUserQuestion(user: User): void{
    const userId = user.id;
    this.userService.getUserQuestions(userId).subscribe({
      next: (questions) => {
        this.questions = questions;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
