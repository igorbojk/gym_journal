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

  getJournalTrainings() {
    const trainings = [];
    this.journalService.journal.trainings.forEach((element) => {
      trainings.push(element);
    });
    return trainings;
  }

  getExerciseMaxWeight(trainingTitle, exerciseTitle) {

    const maxWeightArray = [];
    const filteredTrainings = this.journalService.calendar.filter(i => i.title == trainingTitle);
    filteredTrainings.forEach((element) => {
      element.exercises.filter(el => el.title == exerciseTitle).forEach((exercise) => {
        const weightArray = exercise.repetitions.map(i => i.weight);
        const maxWeight = Math.max.apply( Math, weightArray );
        maxWeightArray.push(maxWeight);
      });
    });
    return maxWeightArray;
  }

  getMaxWeightForExercise(trainingTitle, exerciseTitle) {
    const maxWeightArray = [];
    const filteredTrainings = this.journalService.calendar.filter(i => i.title == trainingTitle);
    filteredTrainings.forEach((element) => {
      element.exercises.filter(el => el.title == exerciseTitle).forEach((exercise) => {
        const weightArray = exercise.repetitions.map(i => i.weight);
        const maxWeight = Math.max.apply( Math, weightArray );
        maxWeightArray.push(maxWeight);
      });
    });
    return maxWeightArray;
  }

}
