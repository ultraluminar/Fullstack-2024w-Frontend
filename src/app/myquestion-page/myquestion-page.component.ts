import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../service/user.service';
import { QuestionArray } from '../model/question/question-array';
import { User } from '../model/user/user';

@Component({
  selector: 'app-myquestion-page',
  standalone: true,
  imports: [],
  templateUrl: './myquestion-page.component.html',
  styleUrl: './myquestion-page.component.css'
})
export class MyquestionPageComponent {
  private userService: UserService;
  private route: ActivatedRoute;

  question: QuestionArray | null = null;
  user: User | null = null;
  error: boolean = false;

  constructor(route: ActivatedRoute, userService: UserService) {
    this.userService = userService;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) =>{
      const userId = parseInt(params.get('userId') || '');
      this.getUserQuestion(userId);
    });
  }

  private getUserQuestion(userId: number): void{
    if (isNaN(userId)) {
      this.error = true;
      return
    }
    this.userService.getUserQuestion(userId).subscribe({
      next: (question) => {
        this.error = false;
        this.question = question;
      },
      error: (error) => {
        this.error = true;
      }
    });
  }
}
