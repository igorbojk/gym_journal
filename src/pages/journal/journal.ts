import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, App, NavController, ToastController} from "ionic-angular";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {TrainingProfilePage} from "../training-profile/training-profile";
import {HistoryTrainingClass, TrainingClass} from "../../declarations/gym-journal.declaration";
import {CurrentTrainingPage} from "../current-training/current-training";



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
    private journalService: JournalServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private app: App
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
            const training = new TrainingClass(data.title);
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

  startTraining(title) {
    const training = new HistoryTrainingClass(title);
    this.journalService.startTraining(training);
    this.app.getRootNav().setRoot(CurrentTrainingPage, {trainingId: training.id});
  }

  openStartingTrainingMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: this.generateButtonsForTrainings()
    });
    actionSheet.present();
  }

  generateButtonsForTrainings() {
    const buttons = [];

    this.currentJournal.trainings.forEach((element) => {
      buttons.push(
        {
          text: element.title,
          handler: () => {
            this.startTraining(element.title);
          }
        }
      );
    });
    return buttons;
  }

}
