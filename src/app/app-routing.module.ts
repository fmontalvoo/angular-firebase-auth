import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AngularFireAuthGuard,
  AuthPipeGenerator,
  customClaims,
  hasCustomClaim,
  redirectLoggedInTo
} from '@angular/fire/compat/auth-guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EditorComponent } from './pages/editor/editor.component';
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
  return pipe(customClaims, map(claims => (claims.hasOwnProperty(claim) && !!claims['admin']) || redirect));
}

const hasRole = (roles: string[], redirect: string | any[]) => {
  return pipe(customClaims, map(claims => {
    if (claims.hasOwnProperty('roles')) {
      let hasRole: boolean = false;
      roles.forEach(role => hasRole ||= claims['roles'].includes(role));
      return hasRole || redirect;
    }
    return redirect;
  }));
}

const adminOnly = () => accountAdmin('admin', ['home']);
const withRolesOnly = () => hasRole(['editor'], ['home']);

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
    path: 'editor',
    component: EditorComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: withRolesOnly }
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
