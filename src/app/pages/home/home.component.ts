import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isAdmin: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.currentUser().then(data => {
      data?.getIdTokenResult().then(idTokenResult => {
        console.log(idTokenResult);
        if (!!idTokenResult.claims.admin) {
          this.isAdmin = true;
        }
      });
    });
  }

  logOut(): void {
    this.auth.signOut()
      .then(_ => {
        console.info("Cerrando sesion");
        this.router.navigate(['/login']);
      });
  }

}
