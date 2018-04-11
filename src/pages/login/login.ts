import {Component} from "@angular/core";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})

export class LoginPage {


  constructor(
    private userService: UserServiceProvider,
    private navCtrl: NavController
  ) {
  }

  setUser(userName) {
    this.userService.setUser(userName);
    this.navCtrl.setRoot(TabsPage);
  }
}
