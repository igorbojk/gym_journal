import {Injectable} from '@angular/core';
import {Journal} from "../../declarations/gym-journal.declaration";

@Injectable()
export class JournalsServiceProvider {

  journals: Journal[] = [
    {
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
    }
  ];

  constructor() {
  }

  addJournal(journal) {
    this.journals.push(journal)
  }

  getJournal(id) {
    return this.journals.find(i => i.id === id);
  }

  deleteJournal(journal) {
    this.journals = this.journals.filter(i => i !== journal)
  }

  getTraining(journalId, trainingId) {
    return this.journals.find(i => i.id == journalId).trainings.find(i => i.id === trainingId);
  }

  addTraining(journalId, training) {
    this.journals.find(i => i.id == journalId).trainings.push(training);
  }

  updateTraining(journalId, trainingId, training) {
    const currentJournal = this.journals.find(i => i.id == journalId);
    const currentTraining = currentJournal.trainings.find(i => i.id === trainingId);
    Object.assign(currentTraining, training);
  }

  deleteTraining(journalId, trainingId) {
    const currentJournal = this.journals.find(i => i.id == journalId);
    currentJournal.trainings = currentJournal.trainings.filter(i => i.id !== trainingId);
  }

  addExercise(journalId, trainingId, exercise) {
    this.journals.find(i => i.id == journalId).trainings.find(i => i.id === trainingId).exercises.push(exercise);
  }

  editExrcise(journalId, trainingId, exerciseId, exercise) {
    const currentJournal = this.journals.find(i => i.id == journalId);
    const currentTraining = currentJournal.trainings.find(i => i.id === trainingId);
    const currentExercise = currentTraining.exercises.find(i => i.id == exerciseId);
    Object.assign(currentExercise, exercise);
  }

  deleteExercise(journalId, trainingId, exercise) {
    const currentJournal = this.journals.find(i => i.id == journalId);
    const currentTraining = currentJournal.trainings.find(i => i.id === trainingId);
    currentTraining.exercises = currentTraining.exercises.filter(i => i.id !== exercise.id);
  }


}
