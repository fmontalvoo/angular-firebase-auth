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

  public signOut() {
    return this.auth.signOut();
  }

  public authStatus() {
    return this.auth.authState;
  }
}
