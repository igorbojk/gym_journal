import {Injectable} from '@angular/core';
import {exercise, Journal} from "../../declarations/gym-journal.declaration";

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

  getJournal(id) {
    return this.journals.find(i => i.id === id);
  }

  deleteJournal(journal) {
    this.journals = this.journals.filter(i => i !== journal)
  }

  addTraining(journalId, training) {
    this.journals.find(i => i.id == journalId).trainings.push(training);
  }

  getTraining(journalId, trainingId) {
    return this.journals.find(i => i.id == journalId).trainings.find(i => i.id === trainingId);
  }

  addExercise(journalId, trainingId, exercise) {
    this.journals.find(i => i.id == journalId).trainings.find(i => i.id === trainingId).exercises.push(exercise);
  }

}
