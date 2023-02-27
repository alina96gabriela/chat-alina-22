import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userData?: firebase.User;
  //googleButton = document.querySelector("#loginGoogle");

  
  constructor(private auth: AngularFireAuth, private router: Router, private localStorageService: LocalStorageService) {
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
  
  ngOnInit() { }
  
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      const user = result.user;
      const usr = user?.displayName;
      // document.getElementById('loginGoogle')?.addEventListener('' , e => {
      //   e.preventDefault();
      // })
      this.localStorageService.setItem('Usuario', JSON.stringify(usr));
      this.router.navigate(['chat'])
    });
  }
  
  getUser(){
    return this.localStorageService.getItem('Usuario');
  }

  logout() {
    this.auth.signOut();
    this.localStorageService.removeAll();
  }
}

