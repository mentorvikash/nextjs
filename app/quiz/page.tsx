"use client";

import { useState, ChangeEvent, useEffect } from "react";
import quiz from "./../_utils/question";
import FloatingScoreCard from "./component/scoreCard";

interface RadioOption {
  index: string;
  value: string;
}

interface Answer {
  index: string;
  value: string;
}

interface SelectedAnswers {
  [key: string]: Answer;
}

interface Report {
  notAttented: number;
  rightAnswer: number;
  score: number;
  total: number;
  wrongAnswer: number;
}

export default function Home() {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [report, setReport] = useState<Report>({
    notAttented: 0,
    rightAnswer: 0,
    score: 0,
    total: 0,
    wrongAnswer: 0,
  });

  const { BabarMugalQuestion: quizQuestion } = quiz;
  console.log("count: ", quizQuestion.length);

  const [selectedAnswers1, setSelectedAnswers1] = useState(
    Array(quizQuestion.length).fill("")
  );

  const [finalResult, setFinalResult] = useState<string[]>([]);

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(event.value);
    setIsSubmit(true);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>, index: any) {
    event.stopPropagation();
    // event.preventDefault();

    const newSelectedAnswers = [...selectedAnswers1];
    newSelectedAnswers[index] = event.target.value;
    setSelectedAnswers1(newSelectedAnswers);

    console.log({ event });
    const value = event.target.value;
    const currentQuestion = `Q${index}`;
    selectedAnswers;

    if (!selectedAnswers[currentQuestion]) {
      selectedAnswers[currentQuestion] = {
        index,
        value,
      };
      setSelectedAnswers(selectedAnswers);
    } else {
      selectedAnswers[currentQuestion].value = value;
      setSelectedAnswers(selectedAnswers);
    }
    console.log(selectedAnswers);
  }

  useEffect(() => {
    if (isSubmit === true) {
      evalueation();
    }
  }, [isSubmit]);

  const evalueation = () => {
    const final: string[] = [];
    const totalQue = quizQuestion.length;
    let correctAns = 0;
    let wrongAns = 0;
    quizQuestion.forEach((que, index) => {
      const QueNo = `Q${index}`;
      if (!selectedAnswers[QueNo]) {
        final.push("UA");
      } else if (selectedAnswers[QueNo].value === que.answer) {
        final.push("R");
        correctAns++;
      } else {
        final.push("W");
        wrongAns++;
      }
    });

    const scoreCard = {
      notAttented: quizQuestion.length - (correctAns + wrongAns),
      rightAnswer: correctAns,
      score: correctAns - 0.5 * wrongAns,
      total: quizQuestion.length,
      wrongAnswer: wrongAns,
    };
    setFinalResult(final);
    setReport(scoreCard);
  };

  const handleReset = () => {
    const scoreCardDefault = {
      notAttented: 0,
      rightAnswer: 0,
      score: 0,
      total: 0,
      wrongAnswer: 0,
    };
    setSelectedAnswers({});
    setReport(scoreCardDefault);
    setIsSubmit(false);
  };

  return (
    <div
      style={{ backgroundColor: "#F7F7F7" }}
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      {isSubmit && (
        <FloatingScoreCard
          notAttended={report.notAttented}
          rightAnswer={report.rightAnswer}
          score={report.score}
          total={report.total}
          wrongAnswer={report.wrongAnswer}
        />
      )}
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="">
          <p className="pb-0 w-full text-2xl text-center text-amber-900 ">
            Mugal (Babar) | {quizQuestion.length} Question
          </p>
        </div>
        <div>
          {quizQuestion.map((que, index) => (
            <div className="my-6" key={index}>
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
                  // <li key={i}>{option}</li>
                  <div key={`${index}Opt${i}`} className="ml-6 mt-2">
                    <input
                      // type="checkbox"
                      type="radio"
                      id={option}
                      name={`radioGroup${index}`}
                      value={option}
                      disabled={isSubmit}
                      className=" text-xl mr-1.5"
                      // checked={selectedValue === option.value}
                      checked={selectedAnswers1[index] === option}
                      onChange={(event: any) => handleChange(event, index)}
                    />
                    <label className=" text-gray-700  text-xl" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                ))}
              </ol>
              {isSubmit && (
                <p className="text-green-600 font-bold">{que.answer}</p>
              )}
            </div>
          ))}
          <div className="flex justify-center pb-4">
            {!isSubmit ? (
              <button
                type="button"
                className=" align-middle text-black bg-white text-xl px-4 py-2 font-bold border-1 border-gray-700 rounded-xl shadow-xl hover:border-0"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              // <button
              //   type="button"
              //   className=" align-middle text-black bg-white text-xl px-4 py-2 border-1 font-bold rounded-xl shadow-xl hover:border-0"
              //   onClick={handleReset}
              // >
              //   Try Again
              // </button>
              <button
                type="button"
                className=" align-middle text-black bg-white text-xl px-4 py-2 border-1 font-bold rounded-xl shadow-xl hover:border-0"
              >
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-700"
                  href="/"
                  rel="noopener noreferrer"
                >
                  {`Home`}
                </a>
              </button>
            )}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {`<-- back`}
        </a>
      </footer>
    </div>
  );
}
