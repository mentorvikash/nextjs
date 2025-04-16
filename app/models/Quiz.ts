import mongoose, { Document, Model, Schema } from "mongoose";
import { Question } from "../quiz/interface";

const QuizSchema = new Schema<Question>(
  {
    answer: {
      type: String,
      required: true,
    },
    know_more: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz: Model<Question> =
  mongoose.models.Quiz || mongoose.model<Question>("Quiz", QuizSchema);

export default Quiz;
