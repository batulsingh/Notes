import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { NoteCreateRequestBody } from 'src/app/shared/noteRequestBody';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  url = environment.Url

  constructor(
    private httpClient:HttpClient
  ) { }

  public saveNote(note: NoteCreateRequestBody): Observable<any> {
    return this.httpClient.post<HttpResponse<any>>(this.url+'/addNote', note)
  }

  public updateNote(note: NoteCreateRequestBody, noteId: number): Observable<any> {
    return this.httpClient.put<HttpResponse<any>>(this.url+'/updateNote/'+noteId, note)
  }

  public getNotes(): Observable<any> {
    return this.httpClient.get<HttpResponse<any>>(this.url+'/getNotes')
  }

  public deleteNote(noteId: number): Observable<HttpResponse<any>> {
    console.log("deleteNote called")
    return this.httpClient.delete<HttpResponse<any>>(this.url+'/deleteNote/'+noteId)
  }
}
