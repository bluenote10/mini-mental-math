import { generateQuestions } from "./question";
import { QuestionSeriesView } from "./QuestionSeriesView";

function App() {
  return <QuestionSeriesView questions={generateQuestions()} />;
}

export default App;
