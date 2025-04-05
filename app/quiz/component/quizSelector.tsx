import { QuizSelectorProps } from "../interface";

export default function QuizSelector({ startTimer }: QuizSelectorProps) {
  return (
    <button onClick={startTimer} className="p-2 bg-blue-500 text-white rounded">
      Start Quiz
    </button>
  );
}
