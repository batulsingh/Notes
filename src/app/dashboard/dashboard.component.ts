import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { NoteService } from '../services/note-service/note.service';
import { NoteResponseBody } from '../shared/models/noteResponseBody';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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
  noteList: NoteResponseBody[] | undefined

  ngOnInit() {
  this.noteService.getNotes().subscribe(
    (notes) => {
    this.noteList = notes;
    // Fix sorting
    // this.noteList!.sort((b, a) => (b.createdOn)!.getTime() - (a.createdOn)!.getTime());
 }
 );
}

logOut() {
  this.router.navigate([''])
  sessionStorage.removeItem('username')
  sessionStorage.removeItem('token')
}

}
