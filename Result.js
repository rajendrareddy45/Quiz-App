import React from 'react';
const Result = ({ score, restartQuiz }) => {
  return (
    <div className="result">
      <h2>Your score: {score}</h2>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};
export default Result;
