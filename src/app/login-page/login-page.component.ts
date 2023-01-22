import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/auth-service/authentication.service';
import {UsernameService} from "../services/username.service";
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  username = '';
  password = '';
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]);
  pass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noWhiteSpace]);

  constructor(
    private router: Router,
    private loginservice: AuthenticationService,
    private usernameService: UsernameService,
    private snackBar: MatSnackBar
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

  login() {
    this.loginservice.authenticate(this.username, this.password).subscribe({
      next: data => {
        sessionStorage.setItem('username', this.username);
         let tokenStr= 'Bearer '+ data.token;
         sessionStorage.setItem('token', tokenStr);
         this.router.navigate([`dashboard`]);
      },
      error: error => {
        if(error.status == 401){
          this.snackBar.open("Invalid Credentials", "Try again", {
            duration: 3000,
            panelClass: 'snackbar',
            horizontalPosition: 'center'
          });
        }else if(error.status == 503 || error.status == 404 || error.status == 0){
          this.snackBar.open("Service unavailable", "Please try later", {
            duration: 3000,
            panelClass: 'snackbar',
            horizontalPosition: 'center'
          });
        }
      }
    }
    );
  }

}