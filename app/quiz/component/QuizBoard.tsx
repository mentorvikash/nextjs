import { ChangeEvent, useState } from "react";
import { Quiz } from "../interface";
import { SelectedAnswers } from "../interface";
import TimerCard from "./timerCard";
import { Element } from "react-scroll";

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
              <Element
                key={`${index}Opt${i}`}
                name={`${index}Opt${i}`}
                className=" px-3  border-1 border-gray-400 rounded-md bg-white  flex "
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
                  className=" text-gray-700 text-md align-middle py-3 inline-block w-full"
                  htmlFor={option}
                >
                  {option}
                </label>
              </Element>
            ))}
          </ol>
          {isSubmit && (
            <>
              <p className=" pt-3 px-3 text-green-600 font-semibold">
                {que.answer}
                {knowMoreString?.length && selectedIndex === index ? (
                  <span className=" pl-1 ">
                    <span
                      className="text-red-900 hover:text-red-400"
                      onClick={closeKnowMore}
                    >
                      {" "}
                      less... <br />
                    </span>
                    <span className=" block text-gray-500 px-6 py-1 font-semibold">
                      {que.know_more}
                    </span>
                  </span>
                ) : (
                  que.know_more && (
                    <span
                      className="text-red-900 hover:text-orange-400 pl-1 "
                      onClick={() => handleKnowMore(que.know_more, index)}
                    >
                      {" "}
                      more...
                    </span>
                  )
                )}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuizBoard;
