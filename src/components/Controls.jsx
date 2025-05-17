import styled from 'styled-components';
import { motion } from 'framer-motion';

const ControlsContainer = styled(motion.div)`
  margin: 2rem 0;
`;

const Button = styled(motion.button)`
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(106, 17, 203, 0.6);
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

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LoadingSpinner = styled(motion.div)`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Controls = ({ onStart, gameState, loading }) => {
  const buttonText = gameState === 'completed' ? 'Play Again' : 'Start Quiz';

  return (
    <ControlsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={onStart}
        disabled={loading}
        whileTap={{ scale: 0.95 }}
      >
        {buttonText}
        {loading && <LoadingSpinner />}
      </Button>
    </ControlsContainer>
  );
};

export default Controls;
