import { Component } from '@angular/core';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {App, NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {ProfilePage} from "../profile/profile";
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  constructor(
    private authService: AuthServiceProvider,
    private userService: UserServiceProvider,
    private navCtrl: NavController,
    private firebaseService: FirebaseServiceProvider,
  ) {
  }

  signUp(email, password){
    this.authService.signUp(email, password).then(value => {
      this.firebaseService.addUser({id: value.uid}).then(
        result => {
          this.userService.setUser(value);
          this.navCtrl.setRoot(ProfilePage);
        },
        err => {
          console.log(err)
        }
      );
    })
      .catch(err => {
        console.log(err);
      })
  }

}
