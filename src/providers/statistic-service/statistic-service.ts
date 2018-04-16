import { Injectable } from '@angular/core';
import {JournalServiceProvider} from "../journal-service/journal-service";

@Injectable()
export class StatisticServiceProvider {

  public testUser = {
    weight: 10,
  }

  constructor(
    private journalService: JournalServiceProvider
  ) {
  }

  getWeightChange() {
    const lastTraining = this.journalService.calendar.length - 1;
    const lastTrainingWeight = this.journalService.calendar[lastTraining].weight;
    const WeightDifference = this.testUser.weight - lastTrainingWeight;
    return WeightDifference;
  }

  getCurrentWeight() {
    const lastTraining = this.journalService.calendar.length - 1;
    return this.journalService.calendar[lastTraining].weight;
  }

  checkTrainings() {
    return this.journalService.calendar.length;
  }

}
