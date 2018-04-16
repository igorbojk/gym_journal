export interface Journal {
  id: string;
  title: string;
  trainings: Training[];
}

export interface Training {
  id: string;
  title: string;
  weight?: number;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  title: string;
  repetitions: Repetition[];
  repetitionsCount: number;
}

export interface  Repetition {
  repetition?: number;
  weight?: number;
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
  repetitionsCount: number;
  repetitions: Repetition[];

  constructor(title: string, repetitionsCount: number) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.repetitionsCount = repetitionsCount;
    this.repetitions = [];
  }
}

export interface HistoryTraining {
  id: string;
  title: string;
  startAt: number;
  stopAt: number;
  weight: number;
  exercises: Exercise[];
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
