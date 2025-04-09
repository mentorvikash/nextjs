"use client";

import { useState, useRef, ChangeEvent, useEffect, Suspense } from "react";
import ScoreCard from "./component/scoreCard";
import QuizHeading from "./component/quizHeading";
import TimerCard from "./component/timerCard";
import QuizSelector from "./component/quizSelector";
import { Quiz, Report, SelectedAnswers } from "./interface";
import { getQuestion } from "../_utils/question";
import QuestionNavigator from "./component/QuestionNavigator";
import QuizBoard from "./component/QuizBoard";
import QuizFooter from "./component/QuizFooter";

export default function Home() {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [isSubmit, setIsSubmit] = useState(false);
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
  const [quizQuestion, setQuizQuestion] = useState<Quiz>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [finalResult, setFinalResult] = useState<string[]>([]);

  function checkStartMatch(str: string, target: string) {
    // Create a case-insensitive regular expression
    const regex = new RegExp(`^${target}`, "i");
    // Test if the string starts with the target (case-insensitive)
    return regex.test(str);
  }

  const calculateTime = (): number => {
    const isMatched = checkStartMatch(selectedOption, "math");
    return Math.round(
      (((isMatched ? 100 : 30) * 60 * 1000) / 100) * quizQuestion.length
    ); // in milliseconds
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
      clearInterval(intervalRef.current as NodeJS.Timeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  useEffect(() => {
    const question: Quiz = getQuestion(selectedOption);
    setQuizQuestion(question);
  }, [selectedOption]);

  useEffect(() => {
    if (isSubmit === true) {
      evalueation();
    }
  }, [isSubmit]);

  function handleSubmit() {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setIsSubmit(true);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    event.stopPropagation();
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

  const handleReset = (type: string) => {
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
    if (type === "tryAgain") {
      startTimer();
    }
    if (type === "selectAgain") {
      setSelectedOption("");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#F7F7F7" }}
      className=" min-h-screen sm:py-8  md:mx-20  font-[family-name:var(--font-geist-sans)]"
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
      {!timerRunning && (
        <QuizSelector
          startTimer={startTimer}
          setQuizQuestion={setQuizQuestion}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )}

      {timerRunning && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <QuestionNavigator
              totalQuestion={quizQuestion.length}
              selectedAnswers={selectedAnswers}
              finalResult={finalResult}
            />
          </Suspense>
          <TimerCard timeLeft={timeLeft} />
          <main className="flex flex-col">
            <QuizHeading
              title={selectedOption || "Sample"}
              totalQuestion={quizQuestion.length}
            />
            <div>
              <QuizBoard
                finalResult={finalResult}
                handleChange={handleChange}
                isSubmit={isSubmit}
                quizQuestion={quizQuestion}
                selectedAnswers={selectedAnswers}
                timerRunning={timerRunning}
              />
              <QuizFooter
                handleReset={handleReset}
                handleSubmit={handleSubmit}
                isSubmit={isSubmit}
                timerRunning={timerRunning}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
