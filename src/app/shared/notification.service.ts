import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationData } from './notification-data.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications$: Subject<NotificationData> = new Subject()

  get notifications(){
    return this.notifications$.asObservable()
  }

  constructor() { }

  show(text: string, duration = 5000){
    this.notifications$.next({text, duration})
  }
}
