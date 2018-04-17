import {Component, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {ActionSheetController, App, NavParams, Platform, ToastController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {Training} from "../../declarations/gym-journal.declaration";
@Component({
  selector: 'page-current-training',
  templateUrl: 'current-training.html',
})
export class CurrentTrainingPage implements OnInit{

  trainingId: string;
  trainingIdToSave: string;

  currentTraining: Training;

  constructor(
    private journalService: JournalServiceProvider,
    private navParams: NavParams,
    private app: App,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
    this.trainingId = this.navParams.get('trainingId');
    this.trainingIdToSave = this.navParams.get('trainingIdToSave');
    this.setCurrentTraining();
  }

  stopTraining() {
    // if(!this.isHaveEmptyFields()) {
    //   this.showToast('Заполните все поля!');
    //   return;
    // }
    this.journalService.stopTraining(this.trainingIdToSave, this.currentTraining);
    this.app.getRootNav().setRoot(TabsPage);
  }

  setCurrentTraining() {
    const training = this.journalService.getCurrentTraining(this.trainingId);
    this.currentTraining = JSON.parse(JSON.stringify(training));
  }

  test() {
    this.journalService.deleteActiveTraining();
  }

  // isHaveEmptyFields() {
  //   let isHaveEmptyExercise;
  //   this.currentTraining.exercises.forEach((element) => {
  //     isHaveEmptyExercise = element.repetitions.forEach((el) => {
  //       return el.repetition == undefined || el.weight == undefined;
  //     });
  //   });
  //   return  this.currentTraining.weight && isHaveEmptyExercise;
  // }
  //
  // showToast(message) {
  //   let toast = this.toastCtrl.create({
  //     message: message,
  //     duration: 1500
  //   });
  //   toast.present();
  // }

}
