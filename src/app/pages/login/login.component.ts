import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userData?: firebase.User;
  //googleButton = document.querySelector("#loginGoogle");

  ngOnInit() { }

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.userData = user!;
    });

    /*this.googleButton?.addEventListener('click', async (e) => {
      e.preventDefault();

      try {
        const credentials = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        console.log(credentials);
        console.log("google sign in");

        const modalInstance = bootstrap.Modal.getInstance(this.googleButton?.closest('.modal'));
        modalInstance.hide();
      }
      catch(e){
        console.log(e);
      }
      })
      */
  }

  
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      const user = result.user;
      const usr = user?.displayName;
      document.getElementById('loginGoogle')?.addEventListener('' , e => {
        e.preventDefault();
      })
      const us = localStorage.setItem('Usuario', JSON.stringify(usr));
      console.log(us)
    });
  }
  
  getUser(){
    return localStorage.getItem('Usuario');
  }

  

  logout() {
    this.auth.signOut();
    localStorage.clear();
    
  }
}

