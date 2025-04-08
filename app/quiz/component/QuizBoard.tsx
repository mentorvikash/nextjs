import { ChangeEvent } from "react";
import { Quiz } from "../interface";
import { SelectedAnswers } from "../interface";

interface QuizBoardProps {
  quizQuestion: Quiz;
  finalResult: string[];
  isSubmit: boolean;
  timerRunning: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  selectedAnswers: SelectedAnswers;
}

function QuizBoard({
  quizQuestion,
  finalResult,
  isSubmit,
  timerRunning,
  handleChange,
  selectedAnswers,
}: QuizBoardProps) {
  return (
    <>
      {quizQuestion.map((que, index) => (
        <div id={`que${index}`} className="my-6" key={index}>
          <p
            className={`text-xl text-gray-800 font-semibold ${
              finalResult.length && finalResult[index] === "W"
                ? "text-red-600"
                : finalResult[index] === "R"
                ? "text-sky-600"
                : "text-gray-800"
            } `}
          >
            {" "}
            {`${index + 1} ${que.question}`}
          </p>
          <ol>
            {que.options.map((option, i) => (
              <div key={`${index}Opt${i}`} className="ml-6 mt-2">
                <input
                  type="checkbox"
                  id={option}
                  name={`radioGroup${index}`}
                  value={option}
                  disabled={isSubmit || !timerRunning}
                  className=" text-4xl mr-3 scale-150"
                  checked={selectedAnswers[`Q${[index]}`]?.value === option}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(event, index)
                  }
                />
                <label className=" text-gray-700  text-xl" htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
          </ol>
          {isSubmit && (
            <p className=" pt-2 text-green-600 font-bold">{que.answer}</p>
          )}
        </div>
      ))}
    </>
  );
}

export default QuizBoard;
