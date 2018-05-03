export interface IJournal {
  trainings: ITraining[];
}

export interface ITraining {
  id: string;
  title: string;
  weight?: number;
  exercises: IExercise[];
}

export interface IExercise {
  id: string;
  title: string;
  repetitions: IRepetition[];
  repetitionsCount: number;
}

export interface IRepetition {
  repetition?: number;
  weight?: number;
}

export interface IHistoryTraining {
  id: string;
  title: string;
  startAt: number;
  stopAt: number;
  weight: number;
  exercises: IExercise[];
}

export class Training {
  id: string;
  title: string;
  exercises: IExercise[];
  constructor(title: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.exercises = [];
  }
}

export class Exercise {
  id: string;
  title: string;
  repetitionsCount: number;
  repetitions: IRepetition[];
  constructor(title: string, repetitionsCount: number) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.repetitionsCount = repetitionsCount;
    this.repetitions = [];
  }
}


export class HistoryTraining {
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
