import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { NoteRequestBody } from 'src/app/shared/noteRequestBody';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  url = environment.Url

  constructor(
    private httpClient:HttpClient
  ) { }

  public saveNote(note: NoteRequestBody): Observable<any> {
    return this.httpClient.post<HttpResponse<any>>(this.url+'/addNote', note)
  }

  public getNotes(): Observable<any> {
    return this.httpClient.get<HttpResponse<any>>(this.url+'/getNotes')
  }
}
