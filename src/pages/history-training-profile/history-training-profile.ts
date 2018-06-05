import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {HistoryTraining} from "../../declarations/gym-journal.declaration";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";

@Component({
  selector: 'page-history-training-profile',
  templateUrl: 'history-training-profile.html',
})
export class HistoryTrainingProfilePage implements OnInit{

  training: any;

  constructor(
    private navParams: NavParams,
    private momentService: MomentServiceProvider,
    public firebaseService: FirebaseServiceProvider
  ) {
  }

  ngOnInit() {
    this.firebaseService.getHistoryTraining(this.navParams.get('trainingId')).subscribe(
      result => {
        this.training = result;
      }
    )
  }

  getTrainingDate(date) {
    return this.momentService.getFullDate(date);
  }

  getDuration(start, end) {
    const duration = end - start;
    return this.momentService.getDuration(duration);
  }
}
