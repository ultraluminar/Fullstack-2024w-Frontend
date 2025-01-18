import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { UserPageComponent } from './userpage/user-page.component';

export const routes: Routes = [
    { path: 'anmelden', component: LoginComponent},
    { path: 'registrieren', component: RegisterComponent},
    { path: 'kontakt', component: KontaktComponent},
    { path: 'datenschutzerklärung', component: DatenschutzComponent},
    { path: 'user/:userId', component: UserPageComponent},
    { path: 'question/:questionId', component: QuestionPageComponent},
];
