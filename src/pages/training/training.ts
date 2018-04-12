import {Component, OnInit} from '@angular/core';
import {AlertController, App, ToastController} from 'ionic-angular';
import {JournalProfilePage} from "../journal-profile/journal-profile";
import {JournalsServiceProvider} from "../../providers/journals-service/journals-service";


@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class TrainingPage implements OnInit {

  journals = [];

  constructor(private alertCtrl: AlertController,
              public toastCtrl: ToastController,
              private app: App,
              private journalsService: JournalsServiceProvider) {
  }

  ngOnInit() {
    this.journals = this.journalsService.journals;
  }

  addJournal() {
    let promt = this.alertCtrl.create({
      title: 'Введите название нового журнала треннировок',
      inputs: [
        {
          name: 'title',
          placeholder: 'Введите название'
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
            this.addNewJournal(data);
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

  addNewJournal(data) {
    this.showToast(`${data.title} добавлен`);
    this.journalsService.journals.push(data);
  }

  openJournal(journal){
    this.app.getRootNav().setRoot(JournalProfilePage, {journal: journal});
  }
}
