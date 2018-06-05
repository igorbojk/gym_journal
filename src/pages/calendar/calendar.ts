import {Component, OnDestroy, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {NavController} from "ionic-angular";
import {HistoryTrainingProfilePage} from "../history-training-profile/history-training-profile";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {Subscription} from "rxjs/Subscription";
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit, OnDestroy{

  calendar;
  itemsSubscription: Subscription = new Subscription();

  constructor(
    private momentService: MomentServiceProvider,
    private navCtrl: NavController,
    public firebaseService: FirebaseServiceProvider
  ) {
  }

  ngOnInit() {
    this.itemsSubscription = this.firebaseService.getCalendar().subscribe(
      result => {
        this.calendar = result;
      }
    )
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  getDuration(start, end) {
    const duration = end - start;
    return this.momentService.getDuration(duration);
  }

  openTrainingInfo(trainingId) {
    this.navCtrl.push(HistoryTrainingProfilePage, {trainingId: trainingId});
  }

}
