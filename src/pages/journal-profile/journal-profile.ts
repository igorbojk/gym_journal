import { Component } from '@angular/core';
import {AlertController, App, NavParams, ToastController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {JournalsServiceProvider} from "../../providers/journals-service/journals-service";

@Component({
  selector: 'page-journal-profile',
  templateUrl: 'journal-profile.html',
})
export class JournalProfilePage {

  currentJournal: any;

  constructor(
    public navParams: NavParams,
    private app: App,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private journalsService: JournalsServiceProvider
  ) {
    this.setCurrentJournal();
  }

  setCurrentJournal() {
    this.currentJournal = this.navParams.get('journal');
  }

  back() {
    this.app.getRootNav().setRoot(TabsPage);
  }

  editJournal() {
    let promt = this.alertCtrl.create({
      title: 'Введите название журнала треннировок',
      inputs: [
        {
          name: 'title',
          placeholder: 'Введите название',
          value: this.currentJournal.title
        }
      ],
      buttons: [
        {
          text: 'Отмена',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Сохранить',
          handler: (data) => {
            if(!data.title.length) {
              this.showToast('Введите название');
              return false;
            }
            this.currentJournal.title = data.title;
          }
        }
      ]
    });
    promt.present();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  deleteJournal() {
    this.journalsService.deleteJournal(this.currentJournal);
    this.showToast('Журнал удален');
    this.back();
  }

}
