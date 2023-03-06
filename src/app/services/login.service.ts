import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import { LocalStorageService } from './local-storage.service'; 



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userData?: firebase.User;
  //googleButton = document.querySelector("#loginGoogle");

  
  constructor(private auth: AngularFireAuth, private router: Router, private localStorageService: LocalStorageService) {
    this.auth.authState.subscribe((user) => {
      this.userData = user!;
    });
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
    this.router.navigate(['login'])
    this.localStorageService.removeAll();
  }
}

