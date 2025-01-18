import { Component, Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Answer } from '../model/answer/answer';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  @Input() answer!: Answer;
  private userService: UserService;

  user: User | null = null;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getUser(this.answer.userId);
  }

  private getUser(userId: number): void{
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
