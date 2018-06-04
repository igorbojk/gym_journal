import {Component, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {App, NavParams} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {Training} from "../../declarations/gym-journal.declaration";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
@Component({
  selector: 'page-current-training',
  templateUrl: 'current-training.html',
})
export class CurrentTrainingPage implements OnInit{

  trainingId: string;
  trainingIdToSave: string;

  currentTraining: Training;

  constructor(
    private navParams: NavParams,
    private app: App,
    private firebaseService: FirebaseServiceProvider
  ) {

  }

  ngOnInit() {
    this.firebaseService.getTraining(this.navParams.get('trainingId')).subscribe(
      result => {
        this.currentTraining = result;
      }
    );
  }

  stopTraining() {
    this.firebaseService.getCalendar().subscribe(
      result => {
        this.trainingIdToSave = result.find(i => i.id == this.navParams.get('trainingIdToSave')).$key;
        this.currentTraining.stopAt = Date.now();
        this.firebaseService.stopTraining(this.trainingIdToSave, this.currentTraining);
      }
    );
    this.app.getRootNav().setRoot(TabsPage);


  }

}
