import {Component, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {App, NavParams} from "ionic-angular";
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
  ) {

  }

  ngOnInit() {
    this.trainingId = this.navParams.get('trainingId');
    this.trainingIdToSave = this.navParams.get('trainingIdToSave');
    this.setCurrentTraining();
  }

  stopTraining() {
    this.journalService.stopTraining(this.trainingIdToSave, this.currentTraining);
    this.app.getRootNav().setRoot(TabsPage);
  }

  setCurrentTraining() {
    const training = this.journalService.getCurrentTraining(this.trainingId);
    this.currentTraining = JSON.parse(JSON.stringify(training));
    delete this.currentTraining.id;
  }

}
