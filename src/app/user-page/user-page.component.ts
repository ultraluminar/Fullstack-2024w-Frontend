import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../model/user/user';
import { UserService } from '../service/user.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { UserQuestionsComponent } from '../user-questions/user-questions.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, UserQuestionsComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent{
  private userService: UserService;
  private authService: AuthService;
  private router: Router;
  private route: ActivatedRoute;

  user: User | null = null;
  currentUser: User | null = null;
  error: boolean = false;

  constructor(route: ActivatedRoute, authService: AuthService, router: Router, userService: UserService) {
    this.userService = userService;
    this.authService = authService;
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) =>{
      const userId = parseInt(params.get('userId') || '');
      this.getUser(userId);
    });
    this.authService.getUserObservable().subscribe((user: User | null) => {
      this.currentUser = user;
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
        console.log(error);
      }
    });
  }

  public deleteUser(): void {
    if ((this.currentUser && this.user?.id === this.currentUser.id) || this.currentUser?.isAdmin) {
      this.userService.deleteUser(this.user?.id || 0).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.authService.logout();
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
