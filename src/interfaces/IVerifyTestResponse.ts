export interface IVerifiedAnswer {
  exerciseId: string;
  chosenAnswer: string;
  isRight: boolean;
}

export interface IVerifyTestResponse {
  id: string;
  userId: string;
  testId: string;
  verifyTestDateTime: string;
  points: number;
  maxPoints: number;
  verifiedAnswers: Array<IVerifiedAnswer>;
}
