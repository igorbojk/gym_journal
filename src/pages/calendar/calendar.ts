import {Component, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {NavController} from "ionic-angular";
import {HistoryTrainingProfilePage} from "../history-training-profile/history-training-profile";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit{

  calendar = [];

  constructor(
    private momentService: MomentServiceProvider,
    private navCtrl: NavController,
    public firebaseService: FirebaseServiceProvider
  ) {
  }

  ngOnInit() {
    this.firebaseService.getCalendar().subscribe(
      result => {
        this.calendar = result;
      }
    )
  }
  getDuration(start, end) {
    const duration = end - start;
    return this.momentService.getDuration(duration);
  }

  openTrainingInfo(trainingId) {
    this.navCtrl.push(HistoryTrainingProfilePage, {trainingId: trainingId});
  }

}
