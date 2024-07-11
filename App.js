import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import './App.css';

const quizData = [
  {
    id: 1,
    question: 'who is Deputy CM of AP?',
    options: ['Sri Konidala Pawan Kalyan', 'jagan mohan reddy', 'Nara Lokesh', 'NBK'],
    correctAnswer: 'Sri Konidala Pawan Kalyan',
  },
  {
    id: 2,
    question: 'Who is the caption of LSG?',
    options: ['de_COCK', 'KL RAHUL', 'k-pandya', 'sachin'],
    correctAnswer: 'KL RAHUL',
  },
  {
    id: 3,
    question: 'what is rohit jersey number?',
    options: ['80', '45', '78', '81'],
    correctAnswer: '45',
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [quizWidth, setQuizWidth] = useState('50%'); 

  useEffect(() => {
    if (timeLeft === 0) {
      handleQuizEnd();
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleAnswerButtonClick = (answer) => {
    if (!answerSubmitted) {
      setSelectedOption(answer);
      setAnswerSubmitted(true);

      if (answer === quizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextButtonClick = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswerSubmitted(false);
      setSelectedOption('');
    } else {
      setShowScore(true);
    }
  };

  const handleQuizEnd = () => {
    setShowScore(true);
    setTimeLeft(0); 
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60); 
  };

  const handleResize = () => {
    const newWidth = window.innerWidth * 0.5; 
    setQuizWidth(`${newWidth}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app">
      <div className="quiz-container" style={{ width: quizWidth }}>
        <div className="quiz-content">
          {showScore ? (
            <Result score={score} restartQuiz={restartQuiz} />
          ) : (
            <>
              <div className="timer">Time left: {timeLeft} seconds</div>
              <Question
                question={quizData[currentQuestion]}
                handleAnswerButtonClick={handleAnswerButtonClick}
                answerSubmitted={answerSubmitted}
                selectedOption={selectedOption}
              />
              {currentQuestion === quizData.length - 1 ? (
                <button className="submit-button" onClick={handleQuizEnd}>
                  Submit
                </button>
              ) : (
                <button className="next-button" onClick={handleNextButtonClick}>
                  Next
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
