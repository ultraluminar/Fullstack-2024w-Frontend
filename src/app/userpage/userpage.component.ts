import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { __param } from 'tslib';
import { User } from '../model/user/user';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent{
  private userService: UserService;
  private route: ActivatedRoute;

  user: User | null = null;
  error: boolean = false;

  constructor(route: ActivatedRoute, userService: UserService) {
    this.userService = userService;
    this.route = route;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
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
      },
      error: (error) => {
        this.error = true;
      }
    });
  }
}
