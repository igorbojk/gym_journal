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
    return this.firebaseService.getUser(user.uid || user.id);
  }

  updateUser(id, user) {
    return this.firebaseService.updateUser(id, user);
  }


}
