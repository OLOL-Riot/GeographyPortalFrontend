import type { IExerciseList } from "./IExercise";

export default interface IUpdateTest {
  name: string;
  exercises: Array<IUpdateExercise>;
}

export interface IUpdateExercise {
  id: string | null;
  serialNumber: number;
  description: string;
  answers: Array<string>;
  rightAnswer: string;
}
