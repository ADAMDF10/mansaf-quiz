import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  quizResults: defineTable({
    playerName: v.string(),
    answers: v.array(v.object({
      questionIndex: v.number(),
      selectedAnswer: v.number(),
      isCorrect: v.boolean(),
    })),
    totalScore: v.number(),
    completedAt: v.number(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
