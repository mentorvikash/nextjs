"use client";

interface FloatingScoreCardProps {
  total: number;
  score: number;
}

const FloatingScoreCard: React.FC<FloatingScoreCardProps> = ({
  total,
  score,
}) => {
  const style: React.CSSProperties = {
    position: "fixed",
    top: "20px", // Adjust as needed
    right: "20px", // Adjust as needed
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
    padding: "10px 15px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    zIndex: 1000, // Ensure it stays on top
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#333",
  };

  return (
    <div style={style}>
      Score: {total}/{score}
    </div>
  );
};

export default FloatingScoreCard;
