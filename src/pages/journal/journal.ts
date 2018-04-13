import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, ToastController} from "ionic-angular";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {TrainingProfilePage} from "../training-profile/training-profile";
import {TrainingModel} from "../../declarations/gym-journal.declaration";



@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit{

  currentJournal: any;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private journalService: JournalServiceProvider
  ) {

  }

  ngOnInit() {
    this.setCurrentJournal();
  }

  setCurrentJournal() {
    this.currentJournal = this.journalService.getJournal();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  addTraining() {
    let promt = this.alertCtrl.create({
      title: 'Введите название треннировки',
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
            const training = new TrainingModel(data.title);
            this.journalService.addTraining(training);
          }
        }
      ]
    });
    promt.present();
  }

  openTraining(trainingId) {
      this.navCtrl.push(TrainingProfilePage, {journalId: this.currentJournal.id, trainingId: trainingId});
  }

  startTraining() {
    const dateNow = Date.now();

    this.journalService.addTrainingToCalendar(dateNow)
  }
}
