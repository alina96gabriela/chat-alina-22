import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private mensajesDB: AngularFireList<Message>;

  constructor(private db: AngularFireDatabase) {
    this.mensajesDB = this.db.list('/messages', (ref) => ref.orderByChild('date'));
  }

  addMessage(user: string, fecha: string, text: string) {
    try {
      this.mensajesDB.push({
        user,
        fecha,
        text
      });

    } catch (error) {
      alert(error)
    }
  }

  deleteMessage(key: string) {
    this.mensajesDB.remove(key);
    this.mensajesDB.update(key, { text: 'Este mensaje ha sido eliminado' })
  }

  getMensajes(): Observable<Message[]> {
    return this.mensajesDB.snapshotChanges().pipe(
      map((changes) =>
      changes.map((c) => this.getUserFromPayload(c.payload))));

  }

  getUserFromPayload(payload: any): Message {
    return {
      $key: payload.key,
      ...payload.val(),
    };
  }
}