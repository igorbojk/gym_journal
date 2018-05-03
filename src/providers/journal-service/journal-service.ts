import {Injectable} from '@angular/core';
import {IHistoryTraining, IJournal} from "../../declarations/gym-journal.declaration";
import {Storage} from '@ionic/storage';

@Injectable()
export class JournalServiceProvider {

  journal: IJournal;

  calendar: IHistoryTraining[];

  constructor(private storage: Storage) {
  }

  setJournal(journal) {
    this.journal = journal;
  }

  setDefaultJournal() {
    this.journal = {
      trainings: []
    };
    this.saveJournal();
  }

  saveJournal() {
    this.storage.set('journal', this.journal);
  }

  setCalendar(calendar) {
    this.calendar = calendar;
  }

  setDefaultCalendar() {
    this.calendar = [];
    this.saveCalendar();
  }

  saveCalendar(){
    this.storage.set('calendar', this.calendar);
  }

  getJournal() {
    return this.journal;
  }

  getTraining(trainingId) {
    return this.journal.trainings.find(i => i.id === trainingId);
  }

  addTraining(training) {
    this.journal.trainings.push(training);
    this.saveJournal();
  }

  updateTraining(trainingId, training) {
    const currentTraining = this.journal.trainings.find(i => i.id === trainingId);
    Object.assign(currentTraining, training);
    this.saveJournal();
  }

  deleteTraining(trainingId) {
    this.journal.trainings = this.journal.trainings.filter(i => i.id !== trainingId);
    this.saveJournal();
  }

  addExercise(trainingId, exercise) {
    for (let i = 1; i <= exercise.repetitionsCount; i++) {
      exercise.repetitions.push({});
    }
    const currentTraining = this.journal.trainings.find(i => i.id === trainingId);
    currentTraining.exercises.push(exercise);
    this.saveJournal();
  }

  editExercise(trainingId, exerciseId, exercise) {
    exercise.repetitions = [];
    for (let i = 1; i <= exercise.repetitionsCount; i++) {
      exercise.repetitions.push({});
    }
    const currentExercise = this.journal.trainings.find(i => i.id === trainingId).exercises.find(i => i.id == exerciseId);
    Object.assign(currentExercise, exercise);
    this.saveJournal();
  }

  deleteExercise(trainingId, exercise) {
    const currentTraining = this.journal.trainings.find(i => i.id === trainingId);
    currentTraining.exercises = currentTraining.exercises.filter(i => i.id !== exercise.id);
    this.saveJournal();
  }

  getCalendarData() {
    return this.calendar;
  }

  getCurrentTraining(trainingId) {
    return this.journal.trainings.find(i => i.id == trainingId);
  }

  startTraining(training) {
    this.calendar.push(training);
    this.saveCalendar();
  }

  stopTraining(trainingId, data) {
    const currentTraining = this.calendar.find(i => i.id == trainingId);
    Object.assign(currentTraining, data);
    currentTraining.stopAt = Date.now();
    this.saveCalendar();
  }


  deleteActiveTraining() {
    this.calendar = this.calendar.filter(i => i.stopAt);
    this.saveCalendar();
  }

  getHistoryTraining(trainingId) {
    return this.calendar.find(i => i.id === trainingId);
  }
}
