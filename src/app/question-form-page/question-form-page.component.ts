import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CreateQuestion } from '../model/question/create-question';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-question-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-form-page.component.html',
  styleUrl: './question-form-page.component.css'
})
export class QuestionFormPageComponent {
  title = 'Frage erstellen';

  private questionService: QuestionService;
  private authService: AuthService;
  private router: Router;

  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  constructor(questionService: QuestionService, authService: AuthService, router: Router) {
    this.questionService = questionService;
    this.authService = authService;
    this.router = router;
  }

  public submitQuestion(questionForm: NgForm): void {
    if (questionForm.invalid) {
      this.successMessage = null;
      this.errorMessage = 'Bitte fülle alle Felder korrekt aus:\n';
      const errors = questionForm.controls;
      const errorMessages = [];

      for (const name in errors) {
        if (errors[name].errors) {
          if (errors[name].errors['required']) {
            errorMessages.push(`• ${name} ist erforderlich`);
          }
          if (errors[name].errors['minlength']) {
            errorMessages.push(`• ${name} muss mindestens ${errors[name].errors['minlength'].requiredLength} Zeichen lang sein`);
          }
          if (errors[name].errors['maxlength']) {
            errorMessages.push(`• ${name} darf maximal ${errors[name].errors['maxlength'].requiredLength} Zeichen lang sein`);
          }
        }
      }
      this.errorMessage += errorMessages.join('\n');
      return;
    }
    const createQuestion = new CreateQuestion(
      questionForm.value.Frage,
      questionForm.value.Beschreibung
    );
    this.questionService.createQuestion(createQuestion).subscribe({
      next: (question) => {
        this.errorMessage = null;
        this.successMessage = 'Frage erfolgreich erstellt';
        this.router.navigate([`/question/${question.id}`]);
      },
      error: (error) => {
        if (error.status === 401) {
          this.successMessage = null;
          this.errorMessage = 'Dein Token ist abgelaufen. Bitte melde dich erneut an.';
          this.router.navigate(['/anmelden']);
          this.authService.logout();
          return;
        }
        this.successMessage = null;
        this.errorMessage = 'Fehler beim Erstellen der Frage. Bitte versuche es erneut.';
        console.log(error);
      }
    });
  }
}
