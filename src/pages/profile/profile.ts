import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {App} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";
import {Subscription} from "rxjs/Subscription";
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit, OnDestroy{

  currentUser;
  userAvatar;
  itemsSubscription: Subscription = new Subscription();

  constructor(private userService: UserServiceProvider,
              private authService: AuthServiceProvider,
              private storage: Storage,
              private app: App) {
  }

  ngOnInit(){
    this.currentUser = this.userService.currentUser;
    this.setUserAvatar();

  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  setUserAvatar(){
    if (!this.currentUser.photoUrl) {
      this.userAvatar = {};
      return
    }
    this.userAvatar = {backgroundImage: 'url('+this.currentUser.photoUrl+')'}
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
        this.app.getRootNav().setRoot(TabsPage);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
