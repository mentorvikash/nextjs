import { formatTime } from "../utils";
import { TimerCardProps } from "../interface";

const timerCss: React.CSSProperties = {
  position: "sticky",
  top: "0px", // Adjust as needed
  backgroundColor: "rgba(255, 255, 255, 1)", // Semi-transparent white
  padding: "10px 20px",
  fontSize: "1rem",
  color: "black",
  textAlign: "center",
  background: "#FFF3E7",
  zIndex: 1,
};

export default function TimerCard({ timeLeft }: TimerCardProps) {
  return <p style={timerCss}> Time Left: {formatTime(timeLeft)} mins</p>;
}
