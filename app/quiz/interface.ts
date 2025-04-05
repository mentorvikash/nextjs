// Component Props
interface QuizSelectorProps {
  startTimer: () => void;
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
interface QuizQuestion {
  answer: string;
  options: string[];
  question: string;
}

export type { QuizSelectorProps, ScoreCardProps, TimerCardProps, QuizQuestion };
