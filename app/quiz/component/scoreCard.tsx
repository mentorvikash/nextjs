import { ScoreCardProps } from "../interface";

const ScoreCard: React.FC<ScoreCardProps> = ({
  notAttended,
  rightAnswer,
  score,
  total,
  wrongAnswer,
}) => {
  const style: React.CSSProperties = {
    position: "fixed",
    top: "20px", // Adjust as needed
    right: "45px", // Adjust as needed
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
    padding: "10px 15px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    zIndex: 1000, // Ensure it stays on top
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
    width: "160px",
  };

  return (
    <div style={style}>
      <p className="text-center">
        Score:{" "}
        {score < 0 ? (
          <span className="text-red-500"> {score}</span>
        ) : (
          <span className="text-green-600">{score}</span>
        )}
        /{total}
      </p>
      <p className="flex text-center justify-center gap-2 px-2.5">
        {" "}
        <span className=" text-sky-600">{rightAnswer}</span> |{" "}
        <span className=" text-red-600">{wrongAnswer}</span> |{" "}
        <span className=" text-yellow-600">{notAttended}</span>{" "}
      </p>
    </div>
  );
};

export default ScoreCard;
