import {Component, OnDestroy} from '@angular/core';
import {ActionSheetController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {Storage} from "@ionic/storage";
import {Network} from '@ionic-native/network';
import {FirebaseServiceProvider} from "../providers/firebase-service/firebase-service";
import {Subscription} from "rxjs/Subscription";
import {LoginPage} from "../pages/login/login";
import {UserServiceProvider} from "../providers/user-service/user-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  trainingSubscription: Subscription = new Subscription();

  constructor(private platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private actionSheetCtrl: ActionSheetController,
              private firebaseService: FirebaseServiceProvider,
              private network: Network,
              private userService: UserServiceProvider,
              private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.storage.clear()
      statusBar.styleDefault();
      this.storage.get('currentUser').then(
        result => {
          !result || !result.id ? this.goLogin() : this.goTabs(result);
        }
      );
      splashScreen.hide();
    });

    platform.registerBackButtonAction(() => {
      this.openMenu();
    }, 1);

  }

  goLogin() {
    this.rootPage = LoginPage;
  }

  goTabs(user) {
    this.userService.setUser(user).subscribe(
      result => {
        this.userService.currentUser = result.find(i => i.id === (user.uid || user.id));
        this.storage.set('currentUser', {id: user.uid || user.id});
        this.trainingSubscription = this.firebaseService.getCalendar().subscribe(
          result => {
            result.forEach(i => {
              if (!i.stopAt) {
                this.firebaseService.deleteActiveTraining(i.$key);
              }
            });
            this.trainingSubscription.unsubscribe();
          }
        );
        this.rootPage = TabsPage;
      }
    );

  }


  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Вы уверены, что хотите выйти? Все начатые треннировки не будут сохранены.',
      buttons: [
        {
          text: 'Выйти',
          handler: () => {
            // this.journalService.deleteActiveTraining();
            this.platform.exitApp();
          }
        },
        {
          text: 'Отмена',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}

