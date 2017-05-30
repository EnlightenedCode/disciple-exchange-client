import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'register-form',
  templateUrl: 'registerForm.component.html'
})

export class RegisterFormComponent {

  @Output() submitRegister = new EventEmitter();

  registerForm: FormGroup;

  constructor(
    private builder: FormBuilder
  ) {
    this.registerForm = builder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'churchPostalCode': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
    });
  }


  registerUser() {
    console.log('submitted');
    let formData = this.registerForm.value;
    console.log(formData);
    this.submitRegister.emit(formData);
  }
}