import { useState } from "react";
import { Questions } from "../question";
import { QuestionView } from "./QuestionView";
import { QuestionResult, SummaryTableView } from "./SummaryTableView";

type QuestionSeriesState = {
  questionNumber: number;
  questionResults: Array<QuestionResult>;
};

export type QuestionSeriesProps = {
  questions: Questions;
  onDone: () => void;
};

export function QuestionSeriesView(props: QuestionSeriesProps) {
  const [state, setState] = useState<QuestionSeriesState>({
    questionNumber: 1,
    questionResults: [],
  });

  const questionDone = (correct: boolean, time: number) => {
    setState((s) => ({
      questionNumber: s.questionNumber + 1,
      questionResults: [...s.questionResults, { correct, time }],
    }));
  };

  const allQuestionsAnswered =
    state.questionResults.length === props.questions.length;

  if (!allQuestionsAnswered) {
    return (
      <QuestionView
        key={state.questionNumber}
        question={props.questions[state.questionNumber - 1]}
        questionNumber={state.questionNumber}
        questionNumberMax={props.questions.length}
        onDone={questionDone}
      />
    );
  } else {
    return (
      <SummaryTableView
        questionResults={state.questionResults}
        onDone={props.onDone}
      />
    );
  }
}
