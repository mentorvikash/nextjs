// Component Props
interface QuizSelectorProps {
  startTimer: () => void;
  setQuizQuestion: (question: Quiz) => void;
  setSelectedOption: (selectedOption: string) => void;
  selectedOption: string;
}

interface ScoreCardProps {
  notAttended: number;
  rightAnswer: number;
  score: number;
  total: number;
  wrongAnswer: number;
}

interface TimerCardProps {
  timeLeft: number;
}

// Common Typs
interface Question {
  answer: string;
  options: [string, string, string, string];
  question: string;
}

interface Report {
  notAttented: number;
  rightAnswer: number;
  score: number;
  total: number;
  wrongAnswer: number;
}

interface Answer {
  index: string;
  value: string;
}

interface SelectedAnswers {
  [key: string]: Answer;
}

interface Quiz extends Array<Question> {}

export type {
  QuizSelectorProps,
  ScoreCardProps,
  TimerCardProps,
  Quiz,
  Report,
  SelectedAnswers,
};
