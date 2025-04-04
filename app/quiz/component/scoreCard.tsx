"use client";

interface FloatingScoreCardProps {
  notAttended: number;
  rightAnswer: number;
  score: number;
  total: number;
  wrongAnswer: number;
}

const FloatingScoreCard: React.FC<FloatingScoreCardProps> = ({
  notAttended,
  rightAnswer,
  score,
  total,
  wrongAnswer,
}) => {
  const style: React.CSSProperties = {
    position: "fixed",
    top: "75px", // Adjust as needed
    right: "20px", // Adjust as needed
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
    padding: "10px 15px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    zIndex: 1000, // Ensure it stays on top
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#333",
    width: "180px",
  };

  return (
    <div style={style}>
      <p className="text-center">
        Score: {score}/{total}
      </p>
      <p className="flex text-center justify-evenly px-2.5">
        {" "}
        <span className=" text-sky-600">{rightAnswer}</span> |{" "}
        <span className=" text-red-600">{wrongAnswer}</span> |{" "}
        <span className=" text-yellow-600">{notAttended}</span>{" "}
      </p>
    </div>
  );
};

export default FloatingScoreCard;
