import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const QuestionContainer = styled(motion.div)`
  margin-bottom: 2rem;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  line-height: 1.4;
`;

const AnswerButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const AnswerButton = styled(motion.button)`
  background-color: ${(props) => {
    if (props.selected && props.correct) return '#4caf50';
    if (props.selected && !props.correct) return '#f44336';
    if (props.showAnswer && props.correct) return '#4caf50';
    return '#6a11cb';
  }};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => {
      if (props.selected || props.showAnswer) return;
      return '#2575fc';
    }};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: all 0.6s ease;
  }

  &:hover:before {
    transform: translateX(100%);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.secondary ? '#f1f1f1' : 'linear-gradient(to right, #6a11cb, #2575fc)'};
  color: ${props => props.secondary ? '#333' : 'white'};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: ${props => props.secondary ? '0 2px 10px rgba(0, 0, 0, 0.1)' : '0 4px 15px rgba(106, 17, 203, 0.4)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.secondary ? '0 5px 15px rgba(0, 0, 0, 0.1)' : '0 8px 20px rgba(106, 17, 203, 0.6)'};
  }
`;

const Question = ({ questionData, onAnswerSelect, onNextQuestion, onRetryQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerClick = (answer, index) => {
    if (selectedAnswer !== null) return; // Prevent selecting another answer
    
    setSelectedAnswer(index);
    setShowAnswer(true);
    onAnswerSelect(answer.correct);
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    onNextQuestion();
  };

  const handleRetryClick = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    onRetryQuestion();
  };

  return (
    <QuestionContainer
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <QuestionText dangerouslySetInnerHTML={{ __html: questionData.question }} />
      
      <AnswerButtonsContainer>
        {questionData.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            onClick={() => handleAnswerClick(answer, index)}
            selected={selectedAnswer === index}
            correct={answer.correct}
            showAnswer={showAnswer}
            disabled={showAnswer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
            dangerouslySetInnerHTML={{ __html: answer.text }}
          />
        ))}
      </AnswerButtonsContainer>

      {showAnswer && (
        <ButtonsContainer>
          <ActionButton 
            onClick={handleRetryClick}
            secondary
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
          >
            Retry
          </ActionButton>
          <ActionButton 
            onClick={handleNextClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </ActionButton>
        </ButtonsContainer>
      )}
    </QuestionContainer>
  );
};

export default Question;
