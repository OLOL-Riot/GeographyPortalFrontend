export interface IVerifyExercisePost {
  id: string;
  chosenAnswer: string;
}

export interface IVerifyTestPost {
  testId: string;
  userAnswers: Array<IVerifyExercisePost>;
}
