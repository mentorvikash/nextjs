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
    <div className="flex flex-col gap-4 my-3 border-2  ">
      {quizQuestion.map((que, index) => (
        <div
          id={`que${index}`}
          className=" py-3 border-1 border-gray-400"
          key={index}
        >
          <p
            className={`text-lg px-3.5 pt-1  ${
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
          <hr className="border-gray-400 border-0.5 my-3.5 " />
          <ol className="flex flex-col gap-2.5 mx-4">
            {que.options.map((option, i) => (
              <div
                key={`${index}Opt${i}`}
                className=" p-3  border-1 border-gray-400 rounded-md bg-white  "
              >
                <input
                  type="checkbox"
                  id={option}
                  name={`radioGroup${index}`}
                  value={option}
                  disabled={isSubmit || !timerRunning}
                  className=" text-lg mx-2 scale-125"
                  checked={selectedAnswers[`Q${[index]}`]?.value === option}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(event, index)
                  }
                />
                <label className=" text-gray-700 text-md" htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
          </ol>
          {isSubmit && (
            <p className=" pt-3 px-3 text-green-600 font-semibold">
              {que.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuizBoard;
