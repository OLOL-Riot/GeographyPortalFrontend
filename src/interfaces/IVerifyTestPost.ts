export interface IVerifyExercisePost {
  id: string;
  choseAnswer: string;
}

export interface IVerifyTestPost {
  testId: string;
  userAnsvers: Array<IVerifyExercisePost>;
}
