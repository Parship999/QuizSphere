import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Question from './Question';
import Controls from './Controls';
import Score from './Score';

const QuizContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 700px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // idle, playing, completed
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple'
      );
      const data = await response.json();

      const formattedQuestions = data.results.map((questionData) => {
        return {
          question: questionData.question,
          answers: [
            ...questionData.incorrect_answers.map((answer) => ({
              text: answer,
              correct: false,
            })),
            { text: questionData.correct_answer, correct: true },
          ].sort(() => Math.random() - 0.5),
        };
      });

      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const startGame = async () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('playing');
    await fetchQuestions();
  };

  const handleAnswerSelect = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setGameState('completed');
    }
  };

  const handleRetryQuestion = () => {
    // Just re-render the current question
    setCurrentQuestionIndex(currentQuestionIndex);
  };

  const restartGame = () => {
    startGame();
  };

  return (
    <QuizContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        QuizSphere
      </Title>

      <AnimatePresence mode="wait">
        {gameState === 'idle' && (
          <Controls
            onStart={startGame}
            gameState={gameState}
            loading={loading}
          />
        )}

        {gameState === 'playing' && questions.length > 0 && (
          <Question
            key={currentQuestionIndex}
            questionData={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNextQuestion={handleNextQuestion}
            onRetryQuestion={handleRetryQuestion}
          />
        )}

        {gameState === 'completed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Quiz Completed!</h2>
            <p>Your final score is {score} out of {questions.length}</p>
            <Controls onStart={restartGame} gameState={gameState} />
          </motion.div>
        )}
      </AnimatePresence>

      <Score score={score} />
    </QuizContainer>
  );
};

export default Quiz;
