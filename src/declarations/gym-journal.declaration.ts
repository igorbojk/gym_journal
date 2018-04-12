export interface Journal {
  id: string;
  title: string;
  trainings: Training[];
}

export interface Training {
  id: string;
  title: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  title: string;
  repetitions: number;
}

export class JournalModel {

   id: string;
   title: string;
   trainings: Training[];

  constructor(title: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.trainings = [];
  }
}

export class TrainingModel {
   id: string;
   title: string;
   exercises: Exercise[];

  constructor(title: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.exercises = [];
  }
}

export class ExerciseModel {
   id: string;
   title: string;
   repetitions: number;

  constructor(title: string, repetitions: number) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.repetitions = repetitions;
  }
}
