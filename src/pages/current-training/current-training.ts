import {Component, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {App, NavParams} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
@Component({
  selector: 'page-current-training',
  templateUrl: 'current-training.html',
})
export class CurrentTrainingPage implements OnInit{

  trainingId: string;

  constructor(
    private journalService: JournalServiceProvider,
    private navParams: NavParams,
    private app: App
  ) {
  }

  ngOnInit() {
    this.trainingId = this.navParams.get('trainingId');
  }

  stopTraining() {
    this.journalService.stopTraining(this.trainingId);
    this.app.getRootNav().setRoot(TabsPage);
  }

}
