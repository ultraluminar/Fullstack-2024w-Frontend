import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { QuestionFormPageComponent } from './question-form-page/question-form-page.component';
import { authGuard } from './guards/auth.guard';
import { SearchPageComponent } from './search-page/search-page.component';

export const routes: Routes = [
    { path: 'anmelden', component: LoginComponent},
    { path: 'registrieren', component: RegisterComponent},
    { path: 'kontakt', component: KontaktComponent},
    { path: 'datenschutzerklärung', component: DatenschutzComponent},
    { path: 'user/:userId', component: UserPageComponent},
    { path: 'question/:questionId', component: QuestionPageComponent},
    { path: 'frage-stellen', component: QuestionFormPageComponent, canActivate: [authGuard]},
    { path: 'suche', component: SearchPageComponent},
];
