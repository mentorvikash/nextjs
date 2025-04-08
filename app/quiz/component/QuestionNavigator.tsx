import { QuestionNavigatorProps } from "../interface";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestion,
  selectedAnswers,
  finalResult,
}) => {
  const navigatorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const style: React.CSSProperties = {
    position: "fixed",
    top: "0", // Adjust as needed
    right: "0", // Adjust as needed
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
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
    // No need to manually scroll the navigator here, the browser will handle it
    // based on the style's scrollBehavior.
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
        <button
          className={` text-white `}
          onClick={() => handleNavLinkClick(`que${index}`)}
        >
          {que}
        </button>
      </li>
    ));
  };
  // `que${index}`

  return (
    <div style={style} ref={navigatorRef}>
      <ol className="flex flex-col gap-1 ">
        <ScrollBar />
      </ol>
    </div>
  );
};

export default QuestionNavigator;
