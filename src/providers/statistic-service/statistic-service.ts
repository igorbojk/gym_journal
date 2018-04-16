import {Injectable} from '@angular/core';
import {JournalServiceProvider} from "../journal-service/journal-service";
import {MomentServiceProvider} from "../moment-service/moment-service";

@Injectable()
export class StatisticServiceProvider {

  constructor(private journalService: JournalServiceProvider,
              private momentService: MomentServiceProvider) {
  }


  checkTrainings() {
    return this.journalService.calendar.length;
  }

  getTrainingsDates() {
    const trainingsDates = [];
    this.journalService.calendar.forEach((element) => {
      trainingsDates.push(this.momentService.getDate(element.startAt));
    });
    return trainingsDates;
  }

  getWeightChangeArray() {
    const weightChangeArray = [];
    this.journalService.calendar.forEach((element) => {
      if (element.weight) {
        weightChangeArray.push(element.weight);
      }
    });
    return weightChangeArray;
  }
}
