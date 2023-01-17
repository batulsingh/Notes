import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  private usernameSource = new BehaviorSubject(null);
  userfilesource = new BehaviorSubject(null);
  userfilesources = new BehaviorSubject(null);
  username1 = this.usernameSource.asObservable();
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();


  constructor() {
  }

  // changeMessage(message: File) {
  //   this.messageSource.next('x');
  // }

  // changeusername(username: string) {
  //   this.usernameSource.next(username);
  // }

  // sendfile(userfile: File) {
  //   this.userfilesource.next(userfile);
  // }

  // sendfile1(userfiles: File) {
  //   this.userfilesources.next(userfiles);
  // }
}
