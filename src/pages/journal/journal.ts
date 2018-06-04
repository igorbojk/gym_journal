import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, App, NavController, ToastController} from "ionic-angular";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {TrainingProfilePage} from "../training-profile/training-profile";
import {HistoryTraining, Training} from "../../declarations/gym-journal.declaration";
import {CurrentTrainingPage} from "../current-training/current-training";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {FirebaseListObservable} from "angularfire2/database";



@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit{

  currentJournal: any;
  activeId: any;

  trainings: FirebaseListObservable<any[]>;
  newItem = 'test';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private journalService: JournalServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private app: App,
    public firebaseService: FirebaseServiceProvider
  ) {

  }

  getTrainings() {
    this.trainings = this.firebaseService.getTrainings()
  }

  addTraining1(){
    this.firebaseService.addTraining(this.newItem);
  }

  removeTraining(id) {
   this.firebaseService.removeTraining(id);
  }

  ngOnInit() {
    this.getTrainings();
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
            const training = new Training(data.title);
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
    const currentTraining = new HistoryTraining(training.title);
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

  longPressed(training) {
    this.activeId = training.id;

    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Редактировать',
          handler: () => {
            this.editTraining(training);
          }
        },
        {
          text: 'Удалить',
          handler: () => {
            this.deleteTraining(training);
          }
        },
        {
          text: 'Отмена',
          handler: () => {
            this.activeId = null;
          }
        }
      ]
    });
    actionSheet.present();
  }

  editTraining(training) {
    let promt = this.alertCtrl.create({
      title: 'Введите название треннировки',
      inputs: [
        {
          name: 'title',
          placeholder: 'Введите название',
          value: training.title
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
            this.journalService.renameHistoryTrainings(training.title, data.title);
            this.journalService.updateTraining(training.id, data);
            this.activeId = null;
          }
        }
      ]
    });
    promt.present();
  }

  deleteTraining(training) {
    this.navCtrl.popToRoot();
    this.journalService.deleteTraining(training.id);
    this.showToast('треннировку удалено');
  }



}
