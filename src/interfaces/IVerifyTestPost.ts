export default interface IVerifyTestPost {
  testId: string;
  userAnsvers: [
    {
      id: string;
      choseAnswer: string;
    }
  ];
}
