import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../model/user/user';
import { UserService } from '../service/user.service';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, NotFoundComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent{
  private userService: UserService;
  private route: ActivatedRoute;

  user: User | null = null;
  error: boolean = false;

  constructor(route: ActivatedRoute, userService: UserService) {
    this.userService = userService;
    this.route = route;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) =>{
      const userId = parseInt(params.get('userId') || '');
      this.getUser(userId);
    });
  }
  private getUser(userId: number): void{
    if (isNaN(userId)) {
      this.error = true;
      return;
    }
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.error = false;
        this.user = user;
        console.log(this.user);
        console.log(this.user.createdAt);
      },
      error: (error) => {
        this.error = true;
      }
    });
  }
}
