import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginUser } from '../model/user/login-user';
import { NgForm, FormsModule } from '@angular/forms';
import { decodeJwt } from 'jose';

const errorTryAgainString = 'Es gab einen Fehler bei der Anmeldung. Bitte versuche es erneut.';
const errorUnauthorizedString = 'Falscher Benutzername oder falsches Passwort.';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  title = 'Anmeldung';

  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {}

  public login(loginForm: NgForm): void {
    if (!loginForm.valid) {
      this.successMessage = null;
      this.errorMessage = 'Bitte fülle alle Felder korrekt aus:\n';
      const errors = loginForm.controls;
      const errorMessages = [];

      for (const name in errors) {
        if (errors[name].errors) {
          if (errors[name].errors["required"]) {
            errorMessages.push(`• ${name} ist erforderlich`);
          }
          if (errors[name].errors["minlength"]) {
            errorMessages.push(`• ${name} muss mindestens ${errors[name].errors["minlength"].requiredLength} Zeichen lang sein`);
          }
          if (errors[name].errors["maxlength"]) {
            errorMessages.push(`• ${name} darf maximal ${errors[name].errors["maxlength"].requiredLength} Zeichen lang sein`);
          }
        }
      }
      this.errorMessage += errorMessages.join('\n');
      return;
    }
    const loginUser = new LoginUser(loginForm.value.Benutzername, loginForm.value.Passwort);
    this.authService.login(loginUser).subscribe({
      next: (response) => {
        const token = response.token;
        if (token == null) {
          this.errorMessage = errorTryAgainString;
          return;
        }
        const decodedToken = decodeJwt(token);
        const userId = decodedToken["userId"];
        if (userId == null) {
          this.errorMessage = errorTryAgainString;
          return;
        }
        this.errorMessage = null;
        this.successMessage = 'Anmeldung erfolgreich. Weiterleitung...';
        this.router.navigate([`/user/${userId}`]);
      },
      error: (response) => {
        this.successMessage = null;
        if (response.status === 401) {
          this.errorMessage = errorUnauthorizedString;
          return;
        }
        this.errorMessage = errorTryAgainString;
      }
    });
  }
}
