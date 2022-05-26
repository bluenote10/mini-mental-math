export type Question = {
  question: string;
  answer: string;
};

export function generateQuestions(): Questions {
  return [
    {
      question: "20 + 10",
      answer: "30",
    },
    {
      question: "21 + 10",
      answer: "31",
    },
    {
      question: "22 + 10",
      answer: "32",
    },
  ];
}

export type Questions = Array<Question>;
