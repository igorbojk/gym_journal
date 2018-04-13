import {Component, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit{

  calendar;

  constructor(
    private journalService: JournalServiceProvider,
    private momentService: MomentServiceProvider
  ) {
  }

  ngOnInit() {
    this.calendar = this.journalService.getCalendarData();
    console.log(this.calendar);
  }

  getTrainingDate(date) {
    return this.momentService.getFullDate(date);
  }

  getDuration(start, end) {
    const duration = end - start;
    return this.momentService.getDuration(duration);
  }

}
