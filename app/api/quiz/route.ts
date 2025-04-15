export async function GET(request: Request) {
  const simpleQuiz = [
    {
      question: "What is JSX?",
      options: [
        "(a) JavaScript Extension",
        "(b) JavaScript XML",
        "(c) JavaScript Syntax",
        "(d) JSON XML",
      ],
      answer: "(b) JavaScript XML",
      topic: "core concepts",
      know_more:
        "Think of JSX as a way to write HTML-like code directly within your JavaScript. Instead of writing separate HTML files and then trying to manipulate them with JavaScript, JSX lets you create your UI structure right inside your JavaScript code. Behind the scenes, React takes this JSX and transforms it into regular JavaScript instructions that the browser understands to create the actual HTML elements on the page.",
    },
    {
      question: "What are React Components?",
      options: [
        "(a) Reusable UI elements",
        "(b) JavaScript functions",
        "(c) HTML tags",
        "(d) CSS selectors",
      ],
      answer: "(a) Reusable UI elements",
      topic: "core concepts",
      know_more:
        "Imagine building with LEGO bricks. Each React component is like a LEGO brick – it's a self-contained piece of your UI that has its own look and behavior. You can use these components over and over again in different parts of your application, making your code more organized and easier to manage. They can be as small as a button or as large as an entire webpage section.",
    },
  ];
  return new Response(JSON.stringify(simpleQuiz), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { quizType } = body;

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), quizType };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
