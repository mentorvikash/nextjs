import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/app/lib/mongodb";
import { Question, Quiz as IQuiz } from "@/app/quiz/interface";
import Quiz from "@/app/models/Quiz";

export async function GET() {
  await connectToDatabase();

  const quizzes = await Quiz.find();

  return new Response(JSON.stringify(quizzes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  await connectToDatabase();

  console.log({ req });
  // Parse the request body
  const body = await req.json();

  console.log({ body });
  try {
    const url = req.url;

    console.log({ url });

    const quizzes = body;

    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      throw new Error("query should be an array of object");
    }

    const insertedQuizzes = await Quiz.insertMany(quizzes);

    // return res.status(201).json(insertedQuizzes);

    return new Response(JSON.stringify(insertedQuizzes), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // return res.status(400).json({ message: error.message });
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// function PUT(params: type) {}
