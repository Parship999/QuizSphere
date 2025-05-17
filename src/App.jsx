import styled from 'styled-components';
import { motion } from 'framer-motion';
import Quiz from './components/Quiz';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 2rem 1rem;
`;

function App() {
  return (
    <AppContainer>
      <Quiz />
    </AppContainer>
  )
}

export default App
