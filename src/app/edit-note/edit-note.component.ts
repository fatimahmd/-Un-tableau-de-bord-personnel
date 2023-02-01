import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  note!: Note | undefined

  constructor(private route:ActivatedRoute,
              private noteService: NoteService,
              private router: Router,
              private notificationService: NotificationService){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      const idParam = paramMap.get('id')


      this.note = this.noteService.getNote(idParam)


    })

  }


      onFormSubmit (form: NgForm){
        const id = this.note ? this.note.id : '';
        this.noteService.updateNote(id, form.value);
        this.router.navigateByUrl("/notes")

        this.notificationService.show('Note updated!')


    }

    deleteNote(){
      const id = this.note ? this.note.id : '';
      this.noteService.deleteNote(id)
      this.router.navigateByUrl("/notes")

      this.notificationService.show('Note deleted!')
    }


}
