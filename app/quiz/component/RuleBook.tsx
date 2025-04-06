import React from "react";

interface RuleBookProps {}

const RuleBook: React.FC<RuleBookProps> = () => {
  return (
    <div className="bg-gray-100 p-6: sm:p-2 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Quiz Instructions
      </h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>
          <span className="font-semibold">Marking Scheme:</span> Each correct
          answer will be awarded <span className="font-semibold">1 mark</span>.
        </li>
        <li>
          <span className="font-semibold">Negative Marking:</span> For each
          incorrect answer, there will be a deduction of{" "}
          <span className="font-semibold">0.5 marks</span>.
        </li>
        <li>
          <span className="font-semibold">Unattempted Questions:</span> If you
          do not select any option for a question, there will be{" "}
          <span className="font-semibold">no deduction</span>.
        </li>
        <li>
          <span className="font-semibold">Deselecting Options:</span> You can
          deselect your currently selected option by clicking on it again. This
          allows you to change your mind or leave the question unattempted.
        </li>
        <li>
          <span className="font-semibold">Starting the Quiz:</span> Click the "
          <span className="font-semibold text-blue-500">Start Quiz</span>"
          button to initiate the quiz and start the timer.
        </li>
        <li>
          <span className="font-semibold">Submission:</span> Your quiz will be
          automatically submitted when the timer runs out. You can also manually
          submit your quiz by clicking the "
          <span className="font-semibold text-green-500">Submit</span>" button
          (if available).
        </li>
      </ul>
      <p className="mt-4 text-sm text-gray-600">
        Please read these instructions carefully before starting the quiz. Good
        luck!
      </p>
    </div>
  );
};

export default RuleBook;
