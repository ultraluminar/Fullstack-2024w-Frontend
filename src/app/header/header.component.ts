import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../model/user/user';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService: AuthService;

  isLoggedIn: boolean = false;
  user: User | null = null;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.getUserObservable().subscribe((user: User | null) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
