import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveQuizResult = mutation({
  args: {
    playerName: v.string(),
    answers: v.array(v.object({
      questionIndex: v.number(),
      selectedAnswer: v.number(),
      isCorrect: v.boolean(),
    })),
    totalScore: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("quizResults", {
      playerName: args.playerName,
      answers: args.answers,
      totalScore: args.totalScore,
      completedAt: Date.now(),
    });
  },
});

export const getAllResults = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("quizResults").order("desc").collect();
  },
});
