export interface Journal {
  id: string;
  title: string;
  trainings: Training[];
}

export interface Training {
  id: string;
  title: string;
  exercises: exercise[];
}

export interface exercise {
  title: string;
  repetitions: number;
}
