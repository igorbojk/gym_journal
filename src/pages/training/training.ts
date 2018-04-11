import {Component} from '@angular/core';
import {AlertController, ToastController} from 'ionic-angular';


@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class TrainingPage {

  journals = [
    {
      title: 'Жесткая треннировка'
    }
  ]

  constructor(private alertCtrl: AlertController,
              public toastCtrl: ToastController) {
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
    this.journals.push(data)
  }

}
