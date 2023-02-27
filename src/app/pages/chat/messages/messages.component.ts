import { Component, OnInit } from '@angular/core';

import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Message } from 'src/app/interfaces/message';
import { MessagesService } from 'src/app/services/messages.service';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {


  ngOnInit() {}

  private mensajesDB: AngularFireList<Message>;
  messages: Array<Message> = [];
 

  constructor(private db: AngularFireDatabase, private messagesService: MessagesService ){

    this.mensajesDB = this.db.list('/messages', (ref) => ref.orderByChild('date'));

    this.messagesService.getMensajes().subscribe(m => this.messages = m);
  }

  onIonInfinite(e: any) {
    setTimeout(() => {
      (e as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}