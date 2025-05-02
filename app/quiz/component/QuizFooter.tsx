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
    <div className="flex justify-center p-3">
      {timerRunning && !isSubmit ? (
        <div className="flex w-1/3 sm:w-1/2 justify-center ">
          <button
            type="button"
            className="align-middle text-black bg-white md:text-lg px-4 py-2 border-1 border-violet-500 font-bold rounded-md shadow-xl hover:border-0 sm:text-xs"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="flex w-1/3 sm:w-1/2 justify-center gap-3 ">
          <button
            type="button"
            className=" align-middle text-black bg-white md:text-lg px-4 py-2 border-1 border-violet-500 font-bold rounded-md shadow-xl hover:border-0 sm:text-xs"
          >
            <Link href="/">{`Home`}</Link>
          </button>
          <button
            type="button"
            onClick={() => handleReset("selectAgain")}
            className=" align-middle text-black bg-white md:text-lg px-4 py-2 border-1 border-violet-500 font-bold rounded-md shadow-xl hover:border-0 sm:text-xs"
          >
            Select Again
          </button>
          {isSubmit && (
            <button
              type="button"
              className=" align-middle text-black bg-white md:text-lg px-4 py-2 border-1 border-violet-500 font-bold rounded-md shadow-xl hover:border-0 sm:text-xs"
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
