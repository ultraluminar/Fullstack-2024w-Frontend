import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Question } from '../model/question/question';
import { User } from '../model/user/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @Input() question!: Question;
  private userService: UserService;

  user: User | null = null;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getUser(this.question.userId);
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
