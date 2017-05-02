import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'login-form',
  templateUrl: 'loginForm.component.html'
})

export class LoginFormComponent {

    @Output() submitLogin = new EventEmitter();

    loginForm: FormGroup;

    constructor(
        private builder: FormBuilder
    ) { 
        this.loginForm = builder.group({
            'email': ['', Validators.required],
            'password': ['', [Validators.required, Validators.minLength(8)]],
        });
    }


    login(){
        console.log('submitted');
        let formData = this.loginForm.value;
        console.log(formData);
        this.submitLogin.emit(formData);
    }
}