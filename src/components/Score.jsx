import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScoreContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(to right, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.1));
  border-radius: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ScoreText = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const ScoreValue = styled(motion.span)`
  font-size: 1.2rem;
  font-weight: 700;
  color: #6a11cb;
  margin-left: 0.5rem;
`;

const Score = ({ score }) => {
  return (
    <ScoreContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <ScoreText>Score:</ScoreText>
      <ScoreValue
        key={score}
        initial={{ scale: 1.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {score}
      </ScoreValue>
    </ScoreContainer>
  );
};

export default Score;
