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

  getCurrentTrainingsDates(title) {
    const trainingsDates = [];
    const filteredTrainings = this.journalService.calendar.filter(i => i.title == title);
    filteredTrainings.forEach((element) => {
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

  getExerciseMaxWeight(trainingTitle, exerciseTitle) {

    const maxWeightArray = [];
    const filteredTrainings = this.journalService.calendar.filter(i => i.title == trainingTitle);
    filteredTrainings.forEach((element) => {
      if(!element.exercises.find(element => element.title == exerciseTitle)) {
        maxWeightArray.push(null);
      }
      element.exercises.filter(el => el.title == exerciseTitle).forEach((exercise) => {
        const weightArray = exercise.repetitions.map(i => i.weight);
        const maxWeight = Math.max.apply( Math, weightArray );
        maxWeightArray.push(maxWeight);
      });
    });
    return maxWeightArray;
  }

  getTrainings() {
    return this.journalService.journal.trainings.filter(i => i.exercises.length);
  }

}
