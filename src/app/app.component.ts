import { Component } from '@angular/core';
import {ActionSheetController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {JournalServiceProvider} from "../providers/journal-service/journal-service";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private actionSheetCtrl: ActionSheetController,
    private journalService: JournalServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    platform.registerBackButtonAction(() => {
      this.openMenu();
    },1);
  }


  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Вы уверены, что хотите выйти? Все начатые треннировки не будут сохранены.',
      buttons: [
        {
          text: 'Выйти',
          handler: () => {
            this.journalService.deleteActiveTraining();
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

