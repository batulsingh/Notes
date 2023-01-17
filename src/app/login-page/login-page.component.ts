import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/auth-service/authentication.service';
import {UsernameService} from "../services/username.service";
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]);
  pass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noWhiteSpace]);

  constructor(
    private router: Router,
    private loginservice: AuthenticationService,
    private usernameService: UsernameService
  ) {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(){
    return this.pass.hasError('required') ? 'You must enter a value' : 
    this.pass.hasError('noWhiteSpace') ? 'Spaces not allowed' :
    this.pass.hasError('minlength') ? 'Password too small' : '';
  }

  noWhiteSpace(control: AbstractControl) : ValidationErrors | null {
    if((control.value as string).indexOf(' ') >= 0){
        return {noWhiteSpace: true}
    }
    return null;
}

  ngOnInit() {
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        // this.usernameService.changeusername(this.username);
        this.router.navigate([`dashboard`]).then(null);
        this.invalidLogin = false;
        // sessionStorage.clear
      },
      error => {
        this.invalidLogin = true;
        // alert(error);
      }
    ));
  }

}