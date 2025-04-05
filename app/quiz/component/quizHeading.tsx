interface QuizTitleProps {
  title: string;
  totalQuestion: number;
}

export default function QuizHeading({ title, totalQuestion }: QuizTitleProps) {
  return (
    <div className="">
      <p className="pb-0 w-full text-2xl text-center text-amber-900 ">
        {title} | {totalQuestion} Question
      </p>
    </div>
  );
}
