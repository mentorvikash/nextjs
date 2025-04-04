"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
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
  // timer state
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [report, setReport] = useState<Report>({
    notAttented: 0,
    rightAnswer: 0,
    score: 0,
    total: 0,
    wrongAnswer: 0,
  });

  const calculateTime = (): number => {
    return Math.round(((30 * 60 * 1000) / 100) * quizQuestion.length); // in milliseconds
  };

  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && (e.key === "I" || e.key === "U"))) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleRightClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleRightClick);
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, []);

  const { infectionAndImmunizationBioQuestion: quizQuestion } = quiz;
  const [finalResult, setFinalResult] = useState<string[]>([]);

  function handleSubmit() {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setIsSubmit(true);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>, index: any) {
    event.stopPropagation();
    // console.log({ event });
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
      if (selectedAnswers[currentQuestion].value === value) {
        delete selectedAnswers[currentQuestion];
      } else {
        selectedAnswers[currentQuestion].value = value;
      }
      setSelectedAnswers(selectedAnswers);
    }
    // console.log(selectedAnswers);
  }

  useEffect(() => {
    if (isSubmit === true) {
      evalueation();
    }
  }, [isSubmit]);

  const startTimer = (): void => {
    setTimeLeft(calculateTime());
    setTimerRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          handleSubmit();
          clearInterval(intervalRef.current as NodeJS.Timeout);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);
  };

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const evalueation = () => {
    const final: string[] = [];
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
    setTimerRunning(false);
    setFinalResult([]);
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  const style: React.CSSProperties = {
    position: "fixed",
    top: "20px", // Adjust as needed
    right: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
    padding: "10px 19px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    zIndex: 1000, // Ensure it stays on top
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    width: "180px",
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
      {!timerRunning && (
        <button
          onClick={startTimer}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Start Quiz
        </button>
      )}
      {timerRunning && (
        <p style={style} className=" text-amber-900">
          Time Left: {formatTime(timeLeft)}
        </p>
      )}
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="">
          <p className="pb-0 w-full text-2xl text-center text-amber-900 ">
            Infection & Immuization | {quizQuestion.length} Question
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
                  <div key={`${index}Opt${i}`} className="ml-6 mt-2">
                    <input
                      type="checkbox"
                      id={option}
                      name={`radioGroup${index}`}
                      value={option}
                      disabled={isSubmit || !timerRunning}
                      className=" text-4xl mr-3 scale-150"
                      checked={selectedAnswers[`Q${[index]}`]?.value === option}
                      onChange={(event: any) => handleChange(event, index)}
                    />
                    <label className=" text-gray-700  text-xl" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                ))}
              </ol>
              {isSubmit && (
                <p className=" pt-2q text-green-600 font-bold">{que.answer}</p>
              )}
            </div>
          ))}
          <div className="flex justify-center pb-4">
            {timerRunning && !isSubmit ? (
              <button
                type="button"
                className=" align-middle text-black bg-white md:text-xl px-4 py-2 font-bold border-1 border-gray-700 rounded-xl shadow-xl hover:border-0"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <div className="flex w-1/3 justify-between">
                <button
                  type="button"
                  className=" align-middle text-black bg-white md:text-xl px-4 py-2 border-1 font-bold rounded-xl shadow-xl hover:border-0 sm:text-xs"
                >
                  <a className="" href="/" rel="noopener noreferrer">
                    {`Home`}
                  </a>
                </button>
                {isSubmit && (
                  <button
                    type="button"
                    className=" align-middle text-black bg-white md:text-xl px-4 py-2 border-1 font-bold rounded-xl shadow-xl hover:border-0 sm:text-xs"
                    onClick={handleReset}
                  >
                    Try Again
                  </button>
                )}
              </div>
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
