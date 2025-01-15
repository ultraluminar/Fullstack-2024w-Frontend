import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../service/userLogin.service';
import { User } from '../model/userLogin';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  title = 'Anmeldung';

  public user: User = {
    username: '',
    password: ''
  };

  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {}

  public loginUser(loginForm: NgForm){
    if (loginForm.valid){
      this.userService.loginUser(this.user).subscribe({
        next: (res) => {
          console.log('Erfolgreich angemeldet:', res);
          this.successMessage = 'Registrierung angemeldet! Weiterleitung...';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err) => {
          console.error('Fehler bei der Anmeldung:', err);
          this.errorMessage = 'Es gab einen Fehler bei der Anmeldung. Bitte versuche es erneut.';
        }
      });
    }
  }
}
