import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app'

import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../../pages/tabs/tabs";
import {NavController} from "ionic-angular";

@Injectable()
export class AuthServiceProvider {

  user;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signUp(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.firebaseAuth
      .auth
      .signOut();
  }

  updateUserProfile() {
    this.firebaseAuth
      .auth
      .currentUser
      .updateProfile({
        displayName: 'test',
        photoURL: 'https://cameralabs.org/media/k2/items/cache/33cf117627c1f4c261fc668625a54f91_L.jpg'
      }).then(
      result => {
        console.log('nice', result)
      }
    ).catch(err => {
      console.log(err);
    })

  }

}
