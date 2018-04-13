import {Injectable} from '@angular/core';
import {Journal} from "../../declarations/gym-journal.declaration";

@Injectable()
export class JournalServiceProvider {

  journal: Journal = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Жесткая треннировка',
      trainings: [
        {
          id: Math.random().toString(36).substr(2, 9),
          title: 'Бицепс/трицепс',
          exercises: []
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          title: 'Спина/грудь',
          exercises: []
        }
      ]
    };

  calendar = [

  ];

  constructor() {
  }

  getJournal() {
    return this.journal;
  }

  getTraining(trainingId) {
    return this.journal.trainings.find(i => i.id === trainingId);
  }

  addTraining(training) {
    this.journal.trainings.push(training);
  }

  updateTraining(trainingId, training) {
    const currentTraining = this.journal.trainings.find(i => i.id === trainingId);
    Object.assign(currentTraining, training);
  }

  deleteTraining(trainingId) {
    this.journal.trainings = this.journal.trainings.filter(i => i.id !== trainingId);
  }

  addExercise(trainingId, exercise) {
    this.journal.trainings.find(i => i.id === trainingId).exercises.push(exercise);
  }

  editExrcise(trainingId, exerciseId, exercise) {
    const currentExercise = this.journal.trainings.find(i => i.id === trainingId).exercises.find(i => i.id == exerciseId);
    Object.assign(currentExercise, exercise);
  }

  deleteExercise(trainingId, exercise) {
    const currentTraining = this.journal.trainings.find(i => i.id === trainingId);
    currentTraining.exercises = currentTraining.exercises.filter(i => i.id !== exercise.id);
  }


  getCalendarData() {
    return this.calendar;
  }

  addTrainingToCalendar(training) {
    this.calendar.push(training);
  }

}
