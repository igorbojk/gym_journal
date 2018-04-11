import { Component } from '@angular/core';
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public userService: UserServiceProvider) {

  }

  getCurrentUser() {
    return this.userService.currentUser;
  }

}
