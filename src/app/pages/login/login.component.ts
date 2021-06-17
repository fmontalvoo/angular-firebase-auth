import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  private crearFormulario() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }
    console.log(this.formulario.value);
    const email = this.formulario.controls.email.value;
    const password = this.formulario.controls.password.value;
    this.auth.signIn(email, password).then(response => {
      console.info("Iniciando sesion");
      if (!response.user?.emailVerified)
        this.auth.signOut().then(_ => {
          console.log("Por favor verifique su email");
          this.router.navigate(['/login']);
        });

      console.log(response.user?.emailVerified);
      this.router.navigate(['/home']);
    })
      .catch(error => {
        console.error(error);
      });

    this.formulario.reset();
  }

}
