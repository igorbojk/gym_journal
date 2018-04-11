import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  currentUser: any;

  constructor() {
    console.log('Hello UserServiceProvider Provider');
  }

  setUser(user) {
    this.currentUser = user;
  }

}
