import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  url = environment.Url +'/register'
  username = ''
  password = ''
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]);
  pass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noWhiteSpace]);

  constructor(private router: Router, private httpClient:HttpClient,) { }


  ngOnInit() {
  }

  register(){
    console.log("username :",this.username,"password : ","" );
    let data = {"username": this.username, "password": this.password};

  this.httpClient.post<any>(this.url, data).pipe(catchError(this.errorHandler)).subscribe(
    data=>{console.log("data: ",data);}
  )
  this.router.navigate(['login'])
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

  errorHandler(error:HttpErrorResponse){
    if(error.status == 0){
      alert("Sorry, service unavailable at the moment")
    }else if(error.status === HttpStatusCode.Unauthorized)
    alert("Invalid Credentials")
  return throwError(error.message ||"Server Error")
}
}
