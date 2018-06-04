import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {HistoryTraining} from "../../declarations/gym-journal.declaration";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";

@Component({
  selector: 'page-history-training-profile',
  templateUrl: 'history-training-profile.html',
})
export class HistoryTrainingProfilePage implements OnInit{

  trainingId: string;
  training: HistoryTraining;

  constructor(
    private navParams: NavParams,
    private journalService: JournalServiceProvider,
    private momentService: MomentServiceProvider
  ) {
  }

  ngOnInit() {
    this.trainingId = this.navParams.get('trainingId');
    this.setHistoryTraining();
  }

  setHistoryTraining() {
    // this.training = this.journalService.getHistoryTraining(this.trainingId);
  }

  getTrainingDate(date) {
    return this.momentService.getFullDate(date);
  }

  getDuration(start, end) {
    const duration = end - start;
    return this.momentService.getDuration(duration);
  }
}
