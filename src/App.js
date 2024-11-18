import Quiz from "./Components/Quiz";
import { questions } from "./Data/DataModel";

function App() {
  return (
    <div className="app">
      <h1>Welcome to the Quiz</h1>
      <Quiz questions={questions} />
    </div>
  );
}

export default App;
