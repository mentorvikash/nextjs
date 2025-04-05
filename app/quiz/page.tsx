"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import quiz from "./../_utils/question";
import ScoreCard from "./component/scoreCard";
import QuizHeading from "./component/quizHeading";
import TimerCard from "./component/timerCard";
import QuizSelector from "./component/quizSelector";

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
    startTimer();
  };

  return (
    <div
      style={{ backgroundColor: "#F7F7F7" }}
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      {isSubmit && (
        <ScoreCard
          notAttended={report.notAttented}
          rightAnswer={report.rightAnswer}
          score={report.score}
          total={report.total}
          wrongAnswer={report.wrongAnswer}
        />
      )}
      {!timerRunning ? (
        <QuizSelector startTimer={startTimer} />
      ) : (
        <TimerCard timeLeft={timeLeft} />
      )}
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <QuizHeading
          title="Infection & Immuization"
          totalQuestion={quizQuestion.length}
        />
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
                <p className=" pt-2 text-green-600 font-bold">{que.answer}</p>
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
              <div className="flex w-1/3 sm:w-1/2 justify-center gap-3">
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
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-black"
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
