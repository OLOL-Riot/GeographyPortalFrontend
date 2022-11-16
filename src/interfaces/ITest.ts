import type { IExerciseList } from "./IExercise";

export interface ITest {
  id: string;
  name: string;
  exercises: IExerciseList;
}

export interface ITestList extends Array<ITest> {}
