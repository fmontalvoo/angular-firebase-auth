import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
