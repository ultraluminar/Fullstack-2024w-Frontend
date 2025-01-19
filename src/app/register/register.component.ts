import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CreateUser } from '../model/user/create-user';
import { NgForm, FormsModule } from '@angular/forms';
import { decodeJwt } from 'jose';

const errorTryAgainString = 'Es gab einen Fehler bei der Registrierung. Bitte versuche es erneut.';
const errorUnauthorizedString = 'Falscher Benutzername oder falsches Passwort.';
const errorUsernameTakenString = 'Der Benutzername ist bereits vergeben.';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  title = 'Regestrieren';

  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {}

  public register(registerForm: NgForm): void {
    if (registerForm.invalid) {
      this.successMessage = null;
      this.errorMessage = 'Bitte fülle alle Felder korrekt aus:\n';
      const errors = registerForm.controls;
      const errorMessages = [];

      for (const name in errors) {
        if (errors[name].errors) {
          if (errors[name].errors["required"]) {
            errorMessages.push(`• ${name} ist erforderlich`);
          }
          if (errors[name].errors["email"]) {
            errorMessages.push(`• ${name} ist keine gültige E-Mail-Adresse`);
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
    const createUser = new CreateUser(
      registerForm.value.Benutzername,
      registerForm.value.Email,
      registerForm.value.Passwort
    );
    this.authService.register(createUser).subscribe({
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
        this.successMessage = 'Registrierung erfolgreich. Weiterleitung...';
        this.router.navigate([`/user/${userId}`]);
      },
      error: (response) => {
        this.successMessage = null;
        if (response.status === 409) {
          this.errorMessage = errorUsernameTakenString;
          return;
        }
        if (response.status === 400 && response.error.error === 'email must be an email') {
          this.errorMessage = 'Bitte fülle alle Felder korrekt aus:\n• Email ist keine gültige E-Mail-Adresse';
          return;
        }
        this.errorMessage = errorTryAgainString;
      }
    });
  }
}
