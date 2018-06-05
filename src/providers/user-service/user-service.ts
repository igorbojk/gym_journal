import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {FirebaseServiceProvider} from "../firebase-service/firebase-service";

@Injectable()
export class UserServiceProvider {

  currentUser: any;

  constructor(private storage: Storage,
              private firebaseService: FirebaseServiceProvider) {
  }

  setUser(user) {
    this.firebaseService.getUser(user.uid || user.id).subscribe(
      result => {
        this.currentUser = result.find(i => i.id === (user.uid || user.id));
        this.storage.set('currentUser', {id: user.uid || user.id});
      }
    );
  }

  updateUser(id, user) {
    return this.firebaseService.updateUser(id, user);
  }


}
