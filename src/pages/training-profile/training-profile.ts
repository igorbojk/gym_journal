import {Component, OnInit} from '@angular/core';
import {AlertController, NavParams, ToastController} from "ionic-angular";
import {JournalsServiceProvider} from "../../providers/journals-service/journals-service";


@Component({
  selector: 'page-training-profile',
  templateUrl: 'training-profile.html',
})
export class TrainingProfilePage implements OnInit {

  training: any;

  journalId: string;
  trainingId: string;

  constructor(
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private journalsService: JournalsServiceProvider
  ) {
  }

  ngOnInit() {
    this.journalId = this.navParams.get('journalId');
    this.trainingId = this.navParams.get('trainingId');
    this.setCurrentTraining();
  }

  setCurrentTraining() {
    this.training = this.journalsService.getTraining(this.journalId, this.trainingId);
  }

  addExercise() {
      let promt = this.alertCtrl.create({
        title: 'Создание нового упражнения',
        inputs: [
          {
            name: 'title',
            placeholder: 'Введите название'
          },
          {
            name: 'repetitions',
            type: 'number',
            placeholder: 'Введите количество подходов'
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
              if(!data.repetitions.length) {
                this.showToast('Введите количество подходов');
                return false;
              }
              this.journalsService.addExercise(this.journalId, this.trainingId, data);
              this.showToast(`${data.title} добавлен`);
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

}
