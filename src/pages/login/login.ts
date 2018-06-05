import {Component} from "@angular/core";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {RegisterUserPage} from "../register-user/register-user";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})

export class LoginPage {


  constructor(
    private userService: UserServiceProvider,
    private navCtrl: NavController,
    private authService: AuthServiceProvider
  ) {
  }

  login(email, password) {
    this.authService.login(email, password).then(value => {
      this.userService.setUser(value);
      this.navCtrl.setRoot(TabsPage);
    })
      .catch(err => {
        console.log(err);
      })
  }

  createUser(email, password) {
    this.authService.signUp(email, password);
  }

  updateUser(){
    this.authService.updateUserProfile();
  }

  logout(){
    this.authService.logout();
  }

  registerUser() {
    this.navCtrl.push(RegisterUserPage);
  }
}
