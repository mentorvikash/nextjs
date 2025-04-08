import { formatTime } from "../utils";
import { TimerCardProps } from "../interface";

const timerCss: React.CSSProperties = {
  position: "fixed",
  top: "20px", // Adjust as needed
  right: "45px",
  backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
  padding: "10px 19px",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  zIndex: 1000, // Ensure it stays on top
  fontSize: "0.9rem",
  fontWeight: "bold",
  color: "green",
  textAlign: "center",
  width: "160px",
};

export default function TimerCard({ timeLeft }: TimerCardProps) {
  return (
    <p style={timerCss} className=" text-amber-900">
      Time Left: {formatTime(timeLeft)}
    </p>
  );
}
