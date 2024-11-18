import React, { useState } from "react";

function Quiz({ questions }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  ); // Track selected answers
  const [score, setScore] = useState(null); // Track the user's score

  // Event handlers
  const goBackToPreviousQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleOptionSelect = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter(
      (q, index) =>
        q.answer.trim().toLowerCase() ===
        selectedOptions[index]?.trim().toLowerCase()
    ).length;
    setScore(correctAnswers);
  };

  // Determine if on the first or last question
  const onFirstQuestion = questionIndex === 0;
  const onLastQuestion = questionIndex === questions.length - 1;

  return (
    <div className="quiz">
      <nav>
        <span>
          {score === null
            ? `Question ${questionIndex + 1} of ${questions.length}`
            : "Quiz Completed!"}
        </span>
        <div>
          <button
            onClick={goBackToPreviousQuestion}
            disabled={onFirstQuestion || score !== null}
          >
            Go Back
          </button>
          <button
            onClick={
              score === null
                ? onLastQuestion
                  ? calculateScore
                  : goToNextQuestion
                : () => window.location.reload() // Reset quiz after completion
            }
          >
            {onLastQuestion && score === null
              ? "Submit"
              : score !== null
              ? "Restart Quiz"
              : "Next Question"}
          </button>
        </div>
      </nav>

      {score === null ? (
        <div style={{ marginTop: "20px", padding: "10px" }}>
          <h2>{questions[questionIndex].prompt}</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {questions[questionIndex].options.map((option, index) => (
              <li key={index} style={{ margin: "8px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option}
                    checked={selectedOptions[questionIndex] === option}
                    onChange={() => handleOptionSelect(option)}
                    style={{ marginRight: "8px" }}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="score">
          <h2>
            Your Score: {score} / {questions.length}
          </h2>
          <p>
            {score === questions.length
              ? "Excellent! You got all the answers correct!"
              : score > questions.length / 2
              ? "Good job! You got most answers correct."
              : "Keep practicing! You'll do better next time."}
          </p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
