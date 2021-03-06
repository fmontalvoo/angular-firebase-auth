import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public isAdmin: boolean = false;
  public isEditor: boolean = false;

  private authSubscription: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.auth.authStatus().subscribe(data => {
      // Fuerza a refrescar el token de acceso.
      data?.getIdToken(true).then(idToken => {
        console.log(idToken);
        data?.getIdTokenResult().then(idTokenResult => {

          console.log(idTokenResult);
          const claims = idTokenResult.claims;

          if (claims.hasOwnProperty('admin')) {
            if (!!idTokenResult.claims['admin'])
              this.isAdmin = true;
          }

          if (claims.hasOwnProperty('roles')) {
            if (idTokenResult.claims['roles'].includes('editor'))
              this.isEditor = true;
          }
        });
      });

    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logOut(): void {
    this.auth.signOut()
      .then(_ => {
        console.info("Cerrando sesion");
        this.router.navigate(['/login']);
      });
  }

}
