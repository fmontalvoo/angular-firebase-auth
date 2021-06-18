import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  public signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public signUp(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        response.user?.sendEmailVerification({
          url: 'http://localhost:4200/'
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  public signOut() {
    return this.auth.signOut();
  }

  public authStatus() {
    return this.auth.authState;
  }

  public currentUser() {
    return this.auth.currentUser;
  }
}
