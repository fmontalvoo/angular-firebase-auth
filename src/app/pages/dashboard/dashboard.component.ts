import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private authSubscription: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    console.log('Administracion');
    this.authSubscription = this.auth.authStatus().subscribe(data => {
      console.log(data);
      data?.getIdTokenResult().then(idTokenResult => {
        console.log(idTokenResult);
        if (!!idTokenResult.claims.admin) {
          console.log(idTokenResult.claims.admin);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
