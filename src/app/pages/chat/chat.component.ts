import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/interfaces/message';

import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  
  text!: string;
  messages: Array<Message> = [];
  name = new FormControl('');
  messageInput = new FormControl('');
  ind: any;

  constructor( private messagesService: MessagesService, private loginComp: LoginComponent) {
    //Primera linea dentro del constructor
    //private messagesService: MessagesService, private loginComp: LoginComponent
    this.messagesService.getMensajes().subscribe(m => this.messages = m)
  }

  ngOnInit() { }

  sendMessage() {
    //console.log(this.messagesService.getMessages());
    //console.log(this.messageInput.value);
    //mes.addMessage(this.messageInput.value);
    const messageInput: any = document.querySelector('#name');
    console.log(messageInput.value)
    const date = Date.now().toString();
    const usuario = this.loginComp.getUser()!.toString().replace(/['"]+/g, '');
    this.messagesService.addMessage(usuario,date,messageInput.value);    
  }

}

/*
document.querySelector('#send').forEach(node => node.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById('send').sendMessage();
    }
  }));
*/