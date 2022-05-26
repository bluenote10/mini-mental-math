import { useState } from "react";
import { generateQuestions } from "../question";
import { QuestionSeriesView } from "./QuestionSeriesView";

function App() {
  const [state, setState] = useState(() => ({
    questions: generateQuestions(),
    runId: 0,
  }));

  const reset = () => {
    setState((s) => ({ questions: generateQuestions(), runId: s.runId + 1 }));
  };

  return (
    <QuestionSeriesView
      key={state.runId}
      questions={state.questions}
      onDone={reset}
    />
  );
}

export default App;
