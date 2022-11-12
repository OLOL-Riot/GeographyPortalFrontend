export interface IVerifyExercisePost {
  exerciseId: string;
  chosenAnswer: string;
}

export interface IVerifyTestPost {
  testId: string;
  userAnswers: Array<IVerifyExercisePost>;
}
