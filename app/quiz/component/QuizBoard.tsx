import { ChangeEvent, useState } from "react";
import { Quiz } from "../interface";
import { SelectedAnswers } from "../interface";
import TimerCard from "./timerCard";

interface QuizBoardProps {
  quizQuestion: Quiz;
  finalResult: string[];
  isSubmit: boolean;
  timerRunning: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  selectedAnswers: SelectedAnswers;
  timeLeft: number;
}

function QuizBoard({
  quizQuestion,
  finalResult,
  isSubmit,
  timerRunning,
  handleChange,
  selectedAnswers,
  timeLeft,
}: QuizBoardProps) {
  const [knowMoreString, setKnowMoreString] = useState<string | undefined>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleKnowMore = (knowMore: string | undefined, index: number) => {
    setKnowMoreString(knowMore);
    setSelectedIndex(index);
  };
  const closeKnowMore = () => {
    setKnowMoreString("");
    setSelectedIndex(null);
  };

  return (
    <div className="flex flex-col gap-4 my-3 ml-1 mr-9  ">
      <TimerCard timeLeft={timeLeft} />
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
                  className=" text-lg mx-2 scale-125 align-middle"
                  checked={selectedAnswers[`Q${[index]}`]?.value === option}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(event, index)
                  }
                />
                <label
                  className=" text-gray-700 text-md align-middle"
                  htmlFor={option}
                >
                  {option}
                </label>
              </div>
            ))}
          </ol>
          {isSubmit && (
            <>
              <p className=" pt-3 px-3 text-green-600 font-semibold">
                {que.answer}
                {que.know_more && (
                  <span
                    className="text-red-900 hover:text-orange-400 "
                    onClick={() => handleKnowMore(que.know_more, index)}
                  >
                    {" "}
                    more...
                  </span>
                )}
              </p>
              {knowMoreString?.length && selectedIndex === index ? (
                <div id="  knowMore">
                  <p className="text-gray-500 px-8 pt-2">
                    {que.know_more}
                    <span
                      className=" ml-1 inline-block text-xs text-center p-1 bg-orange-200 hover:bg-orange-300  text-gray-500 hover:text-gray-600 border-1 rounded-md"
                      onClick={closeKnowMore}
                    >
                      close
                    </span>
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuizBoard;
