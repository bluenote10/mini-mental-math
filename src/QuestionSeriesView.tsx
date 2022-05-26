import { useState } from "react";
import { Questions } from "./question";
import { QuestionView } from "./QuestionView";

type SeriesState = "questions" | "summary";

type QuestionSeriesState = {
  questionNumber: number;
  state: SeriesState;
};

type QuestionSeriesProps = {
  questions: Questions;
};

export function QuestionSeriesView(props: QuestionSeriesProps) {
  const [state, setState] = useState<QuestionSeriesState>({
    questionNumber: 1,
    state: "questions",
  });

  const questionDone = (correct: boolean, time: number) => {
    if (state.questionNumber < props.questions.length) {
      setState((s) => ({ ...s, questionNumber: s.questionNumber + 1 }));
    } else {
      setState({
        questionNumber: 1,
        state: "summary",
      });
    }
  };

  if (state.state === "questions") {
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
    return <div>summary</div>;
  }
}
