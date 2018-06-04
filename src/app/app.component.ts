import {Component} from '@angular/core';
import {ActionSheetController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {Storage} from "@ionic/storage";
import { Network } from '@ionic-native/network';
import {FirebaseServiceProvider} from "../providers/firebase-service/firebase-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(private platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private actionSheetCtrl: ActionSheetController,
              private firebaseService: FirebaseServiceProvider,
              private storage: Storage,
              private network: Network) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.storage.clear()
      statusBar.styleDefault();

      this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected :-(');
      });

      this.network.onConnect().subscribe(() => {
        console.log('network connected!');

      });
      this.rootPage = TabsPage;
      splashScreen.hide();
      // this.storage.get('journal').then(
      //   result => {
      //     !result ?  this.journalService.setDefaultJournal() : this.journalService.setJournal(result);
      //     this.storage.get('calendar').then(
      //       calendar => {
      //         !calendar ?  this.journalService.setDefaultCalendar() : this.journalService.setCalendar(calendar);
      //         this.journalService.deleteActiveTraining();
      //         this.rootPage = TabsPage;
      //         console.log(this.journalService.calendar);
      //         splashScreen.hide();
      //       }
      //     );
      //   }
      // );
    });

    platform.registerBackButtonAction(() => {
      this.openMenu();
    }, 1);

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

