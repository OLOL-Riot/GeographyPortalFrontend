export interface IVerifyExercisePost {
  exerciseId: string;
  chosenAnswer: string | null;
}

export interface IVerifyTestPost {
  testId: string;
  userAnswers: Array<IVerifyExercisePost>;
}
