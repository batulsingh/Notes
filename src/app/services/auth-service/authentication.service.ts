import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

export class User{
  constructor(
    public status:string,
     ) {}
  
}

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    url = environment.Url
    isValidUser = false
  constructor(
    private httpClient:HttpClient
  ) { 
     }

     authenticate(username: string, password: string) {
      return this.httpClient.post<any>(this.url+'/authenticate',{username,password}).pipe(
       catchError(this.errorHandler)
      ).pipe(map(
        userData => {
         sessionStorage.setItem('username', username);
         let tokenStr= 'Bearer '+ userData.token;
         sessionStorage.setItem('token', tokenStr);
         return userData;
        }
      ));
    }

    errorHandler(error:HttpErrorResponse){
      if(error.status == 0){
        alert("Sorry, service unavailable at the moment")
      }else if(error.status === HttpStatusCode.Unauthorized){
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("token")
      alert("Invalid Credentials")
      }
    
      return throwError(error.message ||"Server Error")
    }
  

  isUserLoggedIn():boolean {
    
    var res = this.httpClient.post<HttpResponse<any>>(this.url+'/login',null, {observe: 'response'})
    .subscribe(
      // catchError(this.errorHandler),
      response => {
      this.isValidUser = response.status == HttpStatusCode.Ok
    })
      return this.isValidUser && sessionStorage.getItem("token") != null
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
  }
}