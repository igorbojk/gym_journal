import {Component, OnDestroy, OnInit} from '@angular/core';
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {NavController} from "ionic-angular";
import {HistoryTrainingProfilePage} from "../history-training-profile/history-training-profile";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {Subscription} from "rxjs/Subscription";
import {UserServiceProvider} from "../../providers/user-service/user-service";
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
    public firebaseService: FirebaseServiceProvider,
    private userService: UserServiceProvider
  ) {
  }

  ngOnInit() {
    this.itemsSubscription = this.firebaseService.getCalendar().subscribe(
      result => {
        this.calendar = result.filter(i => i.userId == this.userService.currentUser.id);
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
