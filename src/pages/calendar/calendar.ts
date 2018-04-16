import {Component, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {NavController} from "ionic-angular";
import {HistoryTrainingProfilePage} from "../history-training-profile/history-training-profile";
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit{

  calendar;

  constructor(
    private journalService: JournalServiceProvider,
    private momentService: MomentServiceProvider,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.calendar = this.journalService.getCalendarData();
  }

  getTrainingDate(date) {
    return this.momentService.getFullDate(date);
  }

  getDuration(start, end) {
    const duration = end - start;
    return this.momentService.getDuration(duration);
  }

  openTrainingInfo(trainingId) {
    this.navCtrl.push(HistoryTrainingProfilePage, {trainingId: trainingId});
  }

}
