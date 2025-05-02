import { QuestionNavigatorProps } from "../interface";
import { Link } from "react-scroll";

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestion,
  selectedAnswers,
  finalResult,
}) => {
  const style: React.CSSProperties = {
    position: "fixed",
    top: "0", // Adjust as needed
    right: "0", // Adjust as needed
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
    padding: "10px 5px",
    // borderRadius: "5px",
    fontSize: "0.7rem",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    zIndex: 1000, // Ensure it stays on top
    width: "35px",
    height: "100vh",
    overflowY: "scroll",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
  };

  const ScrollBar = () => {
    const questions = [];
    for (let i = 1; i <= totalQuestion; i++) {
      questions.push(i);
    }
    return questions.map((que, index) => (
      <li
        className={`  border-2 text-center align-middle rounded-full ${
          selectedAnswers[`Q${index}`] ? "bg-green-600" : "bg-black"
        } ${
          finalResult.length && finalResult[index] === "W"
            ? "bg-red-600"
            : finalResult[index] === "R"
            ? "bg-sky-600"
            : "bg-black"
        } `}
        key={index}
      >
        <Link to={`que${index}`} smooth={true} duration={500} offset={-50}>
          {que}
        </Link>
      </li>
    ));
  };

  return (
    <div style={style}>
      <ol className="flex flex-col gap-1 ">
        <ScrollBar />
      </ol>
    </div>
  );
};

export default QuestionNavigator;
