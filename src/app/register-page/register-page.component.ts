import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/models/snack-bar.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterPageComponent implements OnInit{

  url = environment.Url +'/register'
  username = ''
  password = ''
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]);
  pass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noWhiteSpace]);
  durationInSeconds = 5;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
    ) { }


  ngOnInit() {
  }

  register(){
    console.log("username :",this.username,"password : ","" );
    let data = {"username": this.username, "password": this.password};

  this.httpClient.post<HttpResponse<any>>(this.url, data).subscribe({
    next: data => {
      this.snackBar.open("Registration Successful", "Please Login", {
        duration: 3000,
        panelClass: 'snackbar',
        horizontalPosition: 'center'
      });
  },
  error: error => {
      if(error.status == 409){
        this.snackBar.open("Email is already registered", "Please Login", {
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

    
    // res=>{
    //   // if(res.status == 409){
    //     this.snackBar.open("message", "action", {
    //       duration: 2500,
    //       panelClass: 'snackbar',
    //       horizontalPosition: 'center'
    //     });
    //   // }
    //   console.log("data: ",res);
    // }
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
    }else if(error.status === HttpStatusCode.Unauthorized){
      alert("Invalid Credentials")
    }else if(error.status == 409){
      // alert("Existing user, please login")
      // this.openSnackBar("test", "test")
    }
  return throwError(error.message ||"Server Error")
}

// openSnackBar() {
//   this.snackBar.openFromComponent(SnackBarComponent, {
//     duration: this.durationInSeconds * 1000,
//   });
// }

}
