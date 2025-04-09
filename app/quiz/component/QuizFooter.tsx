import Link from "next/link";

interface QuizFooterProps {
  timerRunning: boolean;
  isSubmit: boolean;
  handleSubmit: () => void;
  handleReset: (type: string) => void;
}

function QuizFooter({
  handleReset,
  handleSubmit,
  isSubmit,
  timerRunning,
}: QuizFooterProps) {
  return (
    <div className="flex justify-center p-4">
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
            <Link className="" href="/">
              {`Home`}
            </Link>
          </button>
          <button
            type="button"
            onClick={() => handleReset("selectAgain")}
            className=" align-middle text-black bg-white md:text-xl px-4 py-2 border-1 font-bold rounded-xl shadow-xl hover:border-0 sm:text-xs"
          >
            Select Again
          </button>
          {isSubmit && (
            <button
              type="button"
              className=" align-middle text-black bg-white md:text-xl px-4 py-2 border-1 font-bold rounded-xl shadow-xl hover:border-0 sm:text-xs"
              onClick={() => handleReset("tryAgain")}
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizFooter;
