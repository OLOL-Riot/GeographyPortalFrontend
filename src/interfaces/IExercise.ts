export interface IExercise {
  id: string;
  serialNumber: number;
  description: string;
  answers: Array<string>;
  rightAnswer: string;
}

export interface IExerciseList extends Array<IExercise> {}
