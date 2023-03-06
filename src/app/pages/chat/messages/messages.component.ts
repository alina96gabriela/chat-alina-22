import { Component, OnInit, ViewChild } from '@angular/core';

import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Message } from 'src/app/interfaces/message';
import { MessagesService } from 'src/app/services/messages.service';

import { InfiniteScrollCustomEvent, IonContent } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {

  @ViewChild(IonContent, { static: true }) content!: IonContent;

  messages: Array<Message> = [];

  loadingMessages = false;

  constructor(private messagesService: MessagesService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getMensajes();
  }

  onIonInfinite(e: any) {
    this.loadingMessages = true;
    setTimeout(() => {
      (e as InfiniteScrollCustomEvent).target.complete();
      this.loadingMessages = false;
    });
  }

  scrollToBottom(duration: number) {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToBottom(duration);
  }

  getMensajes(){
    this.messagesService.getMensajes().subscribe(m => {
      this.messages = m;
      this.changeUserByName();
      setTimeout(() => {
        this.scrollToBottom(0);
      });

    })
  }

  changeUserByName(){
    this.messages.map(m => {
      if(m.user == this.localStorageService.getUser()){
        m.user = 'Yo';
      }
    })
  }

}