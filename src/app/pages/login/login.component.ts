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
  }
  
  ngOnInit() { }
  
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      const user = result.user;
      const usr = user?.displayName;
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

