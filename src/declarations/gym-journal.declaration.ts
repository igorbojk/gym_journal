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

export class TrainingClass {
   id: string;
   title: string;
   exercises: Exercise[];

  constructor(title: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.exercises = [];
  }
}

export class ExerciseClass {
   id: string;
   title: string;
   repetitions: number;

  constructor(title: string, repetitions: number) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.repetitions = repetitions;
  }
}

export interface HistoryTraining {
  id: string;
  title: string;
  startAt: number;
  stopAt: number;
}

export class HistoryTrainingClass {

  id: string;
  title: string;
  startAt: number;
  stopAt: number;

  constructor(title: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.startAt = Date.now();
    this.startAt;
  }
}
