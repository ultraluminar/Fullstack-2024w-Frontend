import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Answer } from '../model/answer/answer';
import { AuthService } from '../service/auth.service';
import { AnswerService } from '../service/answer.service';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  @Input() answer!: Answer;
  @Output() delete = new EventEmitter<number>();

  private userService: UserService;
  private answerService: AnswerService;
  private authService: AuthService;

  creatorUser: User | null = null;
  currentUser: User | null = null;

  constructor(userService: UserService, answerService: AnswerService, authService: AuthService) {
    this.userService = userService;
    this.answerService = answerService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.getUser(this.answer.userId);
    this.authService.getUserObservable().subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  private getUser(userId: number): void{
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.creatorUser = user;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public deleteAnswer(): void {
    if (this.answer.userId === this.currentUser?.id) {
      this.answerService.deleteAnswer(this.answer.id).subscribe({
        next: () => {
          this.delete.emit(this.answer.id);
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
