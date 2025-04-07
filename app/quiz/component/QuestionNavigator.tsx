import Link from "next/link";
import { QuestionNavigatorProps } from "../interface";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestion,
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
    height: "300px",
    overflowY: "scroll",
    scrollBehavior: "smooth",
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1)); // Remove the '#'
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, searchParams]); // Re-run effect on path or query changes

  const handleNavLinkClick = (id: string) => {
    router.push(
      `${pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }#${id}`
    );
  };

  const ScrollBar = () => {
    const questions = [];
    for (let i = 1; i < totalQuestion; i++) {
      questions.push(i);
    }
    return questions.map((que, index) => (
      <li key={index}>
        <button onClick={() => handleNavLinkClick(`que${index}`)}>{que}</button>
      </li>
    ));
  };
  // `que${index}`

  return (
    <div style={style}>
      <ol>
        <ScrollBar />
      </ol>
    </div>
  );
};

export default QuestionNavigator;
