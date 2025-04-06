import { Quiz, QuizSelectorProps } from "../interface";
import { ChangeEvent, useState, useEffect } from "react";
import { questionType, getQuestion } from "./../../_utils/question";
import RuleBook from "./RuleBook";

const QuizSelector = ({
  startTimer,
  setQuizQuestion,
  setSelectedOption,
  selectedOption,
}: QuizSelectorProps) => {
  const [options, setOptions] = useState([""]);

  useEffect(() => {
    const options = Object.values(questionType);
    setOptions(options);
    const question: Quiz = getQuestion("");
    setQuizQuestion(question);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log({ selectedValue });
    setSelectedOption(selectedValue);
  };

  return (
    <div className=" flex bg-gray-700 w-full flex-col border-8 p-5 gap-2 ">
      <RuleBook />
      <div className="flex w-full justify-center ">
        <select
          name=""
          id=""
          className=" w-4/6 md:w-full text-center border-1 p-1"
          onChange={handleChange}
        >
          <option value="">-- Select Your Quiz --</option>
          {options.map((type, index) => (
            <option key={type + index} className="text-gray-700" value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={startTimer}
        className="p-2 bg-blue-500 text-white rounded"
        disabled={!selectedOption}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizSelector;
