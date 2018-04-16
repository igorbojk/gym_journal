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

  startTraining(training) {
    const currentTraining = new HistoryTrainingClass(training.title);
    this.journalService.startTraining(currentTraining);
    this.app.getRootNav().setRoot(CurrentTrainingPage, {trainingId: training.id, trainingIdToSave: currentTraining.id});
  }

  openStartingTrainingMenu() {
    const isShowTitle = !this.generateButtonsForTrainings().length;
    let actionSheet = this.actionSheetCtrl.create({
      title: isShowTitle ? 'Нет треннировок с упражнениями' : '',
      buttons: this.generateButtonsForTrainings()
    });
    actionSheet.present();
  }

  generateButtonsForTrainings() {
    const buttons = [];

    this.currentJournal.trainings.forEach((element, index) => {
      if(!this.currentJournal.trainings[index].exercises.length) {
        return;
      }
      buttons.push(
        {
          text: element.title,
          handler: () => {
            this.startTraining(element);
          }
        }
      );
    });
    return buttons;
  }

}
