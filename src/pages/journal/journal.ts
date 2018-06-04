import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, App, NavController, ToastController} from "ionic-angular";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {TrainingProfilePage} from "../training-profile/training-profile";
import {HistoryTraining, Training} from "../../declarations/gym-journal.declaration";
import {CurrentTrainingPage} from "../current-training/current-training";
import {FirebaseListObservable} from "angularfire2/database";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";



@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit{

  currentJournal: any;
  activeId: any;

  trainings = [];

  newItem = {
    title: 'test',
    exercises: [1,2,3]
  };
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private app: App,
    public firebaseService: FirebaseServiceProvider
  ) {

  }



  ngOnInit() {
    this.firebaseService.getTrainings().subscribe(
      result => {
        this.trainings = result;
      }
    )
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
            this.firebaseService.addTraining(training);
          }
        }
      ]
    });
    promt.present();
  }

  openTraining(trainingId) {
      this.navCtrl.push(TrainingProfilePage, {trainingId: trainingId});
  }

  startTraining(training) {
    const currentTraining = new HistoryTraining(training.title);
    this.firebaseService.startTraining(currentTraining);
    this.app.getRootNav().setRoot(CurrentTrainingPage, {trainingId: training.$key, trainingIdToSave: currentTraining.id});
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

    this.trainings.forEach((element, index) => {
      if(!this.trainings[index].exercises.length) {
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
    this.activeId = training.$key;

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
            this.firebaseService.updateTraining(training.$key, data);
            this.activeId = null;
          }
        }
      ]
    });
    promt.present();
  }

  deleteTraining(training) {
    this.navCtrl.popToRoot();
    this.firebaseService.removeTraining(training.$key);
    this.showToast('треннировку удалено');
  }



}
