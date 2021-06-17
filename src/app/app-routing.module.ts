import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, AuthPipeGenerator, customClaims, hasCustomClaim, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'

// https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md
// const adminOnly = () => hasCustomClaim('admin');
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const redirectUnauthorizedOrUnverifiedUser: AuthPipeGenerator = () =>
  map(user => {
    if (user) {
      if (user.emailVerified)
        return true;
      else
        return ['login'];
    } else {
      return ['login'];
    }
  });

const accountAdmin = (claim: string, redirect: string | any[]) => {
  return pipe(customClaims, map(claims => claims.hasOwnProperty(claim) || redirect));
}

const adminOnly = () => accountAdmin('admin', ['home']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUnverifiedUser }
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
