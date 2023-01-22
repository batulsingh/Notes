import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../services/note-service/note.service';
import { NoteResponseBody } from '../shared/models/noteResponseBody';
import { NoteCreateRequestBody } from '../shared/noteRequestBody';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private noteService: NoteService,
    private router: Router,
  ) { }

  username = sessionStorage.getItem("username")
  usernameOnly = this.username?.substring(0, this.username.indexOf('@'))
  noteList: NoteResponseBody[] | undefined
  noteContent = '';
  noteCreate: NoteCreateRequestBody = {content: this.noteContent};
  openForm = false;
  note = new FormControl('', [Validators.required, Validators.minLength(1)]);
  noteId = -1
  isUpdateForm = false
  updateNoteId = -1;

  ngOnInit() {
  this.noteService.getNotes().subscribe(
    (notes) => {
    this.noteList = notes;
 }
 );
}

logOut() {
  this.router.navigate([''])
  sessionStorage.removeItem('username')
  sessionStorage.removeItem('token')
}

openNoteForm(noteId: number){
  this.openForm = true;
  if(noteId > 0){
    this.noteService.getNotes().subscribe(
      notes => {
        this.noteContent = notes.filter((it: any) => it.id == noteId)[0].content;
      }
    )
    this.isUpdateForm = true
    this.updateNoteId = noteId
  }
}

closeNoteForm(){
  this.openForm = false;
}

addNote(){
  this.noteCreate.content = this.noteContent;
  if(!this.isUpdateForm){
  this.noteService.saveNote(this.noteCreate).subscribe(
    note => {
      this.noteService.getNotes().subscribe(
        (notes) => {
        this.noteList = notes;
     }
     );
    }
  );
  this.noteContent = ""
  } else {
    this.noteService.updateNote(this.noteCreate, this.updateNoteId).subscribe(
      note => {
        this.noteService.getNotes().subscribe(
          (notes) => {
          this.noteList = notes;
       }
       );
      }
    )
    this.isUpdateForm = false;
    this.updateNoteId = -1;

  }
  this.noteContent = ""
 this.openForm = false
}


deleteNote(noteId: number){
  this.noteService.deleteNote(noteId).subscribe(
    res => {
      this.noteService.getNotes().subscribe(
        (notes) => {
        this.noteList = notes;
        }
     );
    }
  )
}

}
