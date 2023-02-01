import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []

  storageListenSub: Subscription

  constructor() {
    this.loadState()

    this.storageListenSub = fromEvent(window, 'storage')
    .subscribe((event: Event) => {
      if (event instanceof StorageEvent && event.key === 'notes') {
        this.loadState();
      }
    });
  }
  ngOnDestroy(): void {
  if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string | null): Note | undefined{
    return this.notes.find(n => {
      return n.id === id;
    });

  }

  addNote(note: Note) {
    this.notes.push(note)

    this.saveState();
  }

  updateNote(id: string, updateFields: Partial<Note>){
    const note = this.getNote(id)
    if (note) {
      Object.assign(note, updateFields);
      this.saveState();
    }
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return

    this.notes.splice(noteIndex, 1)
    this.saveState();
  }

    saveState() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }

    loadState() {
      try {
        const notesInStorage = localStorage.getItem('notes');
        if(notesInStorage) {
          this.notes.length = 0 //Clear the notes array (while keeping the reference)
          const parsedNotes = JSON.parse(notesInStorage)
          this.notes.push(...parsedNotes)
    } }catch(e){
        console.log('there was an error retrieving the notes from localStorage')
        console.log(e)
      }
    }
  }
