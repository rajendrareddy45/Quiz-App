import React from 'react';
const Question = ({ question, handleAnswerButtonClick, answerSubmitted, selectedOption }) => {
  const optionLetters = ['A', 'B', 'C', 'D'];
  return (
    <div className="question">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <div key={index} className="option-wrapper">
            <div className="option-letter">{optionLetters[index]}</div>
            <button
              className={`${answerSubmitted && selectedOption === option ? (option === question.correctAnswer ? 'correct' : 'wrong') : ''}`}
              onClick={() => handleAnswerButtonClick(option)}
              disabled={answerSubmitted}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Question;
