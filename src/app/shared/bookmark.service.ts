import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService  implements OnDestroy {

  bookmarks: Bookmark[] = []

  storageListenSub: Subscription

  constructor() {
    this.loadState()

    this.storageListenSub = fromEvent(window, 'storage')
    .subscribe((event: Event) => {
      if (event instanceof StorageEvent && event.key === 'bookmarks') {
        this.loadState();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
    }

  getBookmarks() {
    return this.bookmarks
  }

  getBookmark(id: string){
    return this.bookmarks.find(b => b.id === id)
  }

  addBookmark(bookmark: Bookmark){
    this.bookmarks.push(bookmark)
    this.saveState()
  }

  updateBookmark(id: string, updateFields: Partial<Bookmark>)
  { const bookmark = this.getBookmark(id)
    if (bookmark) {
    Object.assign(bookmark, updateFields)
    this.saveState()
}}

deleteBookmark(id: string){
  const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id)
  if(bookmarkIndex == -1)return
  this.bookmarks.splice(bookmarkIndex, 1)
  this.saveState()
}

saveState(){
  localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
}
loadState() {
  try {
    const bookmarksInStorage = localStorage.getItem('bookmarks');
    if (bookmarksInStorage) {
      this.bookmarks.length = 0; // Clear the bookmarks array (while keeping the reference)
      const parsedBookmarks = JSON.parse(bookmarksInStorage, (key: string, value: any) => {
        if (key === 'url') return new URL(value);
        return value;
      });
      this.bookmarks.push(...parsedBookmarks);
    }
  } catch (e) {
    console.log('There was an error retrieving the bookmarks from local storage');
    console.log(e);
  }
}

}

