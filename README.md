# QuizSphere

A stunning trivia quiz application built with React and Vite. This application fetches trivia questions from the Open Trivia Database API and presents them in a beautiful, animated interface.

## Features

- Modern UI with smooth animations using Framer Motion
- Responsive design that works on all devices
- Elegant styling with Styled Components
- Interactive quiz experience with immediate feedback
- Score tracking
- Retry questions or continue to the next one

## Technologies Used

- React
- Vite
- Styled Components
- Framer Motion
- Open Trivia Database API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd quizsphere
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Customization

You can customize the quiz by modifying the API URL in the `Quiz.jsx` component. The current implementation fetches 20 computer science questions with easy difficulty, but you can change the category, difficulty, and number of questions.
