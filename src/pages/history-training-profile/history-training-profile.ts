import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {HistoryTraining} from "../../declarations/gym-journal.declaration";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'page-history-training-profile',
  templateUrl: 'history-training-profile.html',
})
export class HistoryTrainingProfilePage implements OnInit, OnDestroy{

  training;
  itemsSubscription: Subscription = new Subscription();

  constructor(
    private navParams: NavParams,
    private momentService: MomentServiceProvider,
    public firebaseService: FirebaseServiceProvider
  ) {
  }

  ngOnInit() {
    this.itemsSubscription = this.firebaseService.getHistoryTraining(this.navParams.get('trainingId')).subscribe(
      result => {
        this.training = result;
      }
    )
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  getTrainingDate(date) {
    return this.momentService.getFullDate(date);
  }

  getDuration(start, end) {
    const duration = end - start;
    return this.momentService.getDuration(duration);
  }
}
