import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    console.log(this.formulario.controls.email.value);
    console.log(this.formulario.controls.password.value);
    this.formulario.reset();
  }

}
