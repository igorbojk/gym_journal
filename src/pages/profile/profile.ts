import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {App, NavController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {Subscription} from "rxjs/Subscription";
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit, OnDestroy{

  currentUser;

  itemsSubscription: Subscription = new Subscription();

  constructor(private userService: UserServiceProvider,
              private authService: AuthServiceProvider,
              private storage: Storage,
              private app: App) {
  }

  ngOnInit(){
    this.currentUser = this.userService.currentUser;
    console.log(this.currentUser);
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  logout(){
    this.authService.logout().then(
      result => {
        this.app.getRootNav().setRoot(LoginPage);
        this.storage.remove('currentUser');
      }
    )
  }

  updateUserProfile(){
    this.userService.updateUser(this.currentUser.$key, this.currentUser).then(
      result => {
        console.log(result);
        this.app.getRootNav().setRoot(TabsPage);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
