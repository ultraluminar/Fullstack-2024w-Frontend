import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CreateUser } from '../model/user/create-user';
import { AuthService } from '../service/auth.service';
import { NgForm, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  title = 'Regestrieren';

  public userRegister: CreateUser = {
    username: '',
    email: '',
    password: ''
  };

  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {}


  public register(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.authService.register(this.userRegister).subscribe({
        next: (res) => {
          console.log('Erfolgreich registriert:', res);
          this.successMessage = 'Registrierung erfolgreich! Weiterleitung...';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err) => {
          console.error('Fehler bei der Registrierung:', err);
          this.errorMessage = 'Es gab einen Fehler bei der Registrierung. Bitte versuche es erneut.';
        }
      });
    }
  }
}
