import { pgTable, text, serial, integer, json, timestamp, boolean, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Team schema
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  department: text("department"),
  createdAt: timestamp("created_at").defaultNow()
});

export const teamsRelations = relations(teams, ({ many }) => ({
  assessments: many(assessments)
}));

export const insertTeamSchema = createInsertSchema(teams).pick({
  name: true,
  department: true
});

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;

// Assessments schema
export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull().references(() => teams.id, { onDelete: 'cascade' }),
  coachName: text("coach_name").notNull(),
  date: timestamp("date").defaultNow(),
  status: text("status").notNull().default("in_progress"),
  results: json("results").$type<AssessmentResults>()
});

export const assessmentsRelations = relations(assessments, ({ one, many }) => ({
  team: one(teams, {
    fields: [assessments.teamId],
    references: [teams.id]
  }),
  answers: many(answers)
}));

export const insertAssessmentSchema = createInsertSchema(assessments).pick({
  teamId: true,
  coachName: true
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;

// Assessment answers schema
export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  perspectiveId: text("perspective_id").notNull(),
  plateauId: text("plateau_id").notNull(),
  levelId: text("level_id").notNull(),
  questionId: text("question_id").notNull(),
  answer: text("answer").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});

export const answersRelations = relations(answers, ({ one }) => ({
  assessment: one(assessments, {
    fields: [answers.assessmentId],
    references: [assessments.id]
  })
}));

export const insertAnswerSchema = createInsertSchema(answers).pick({
  assessmentId: true,
  perspectiveId: true,
  plateauId: true,
  levelId: true,
  questionId: true,
  answer: true,
  notes: true
});

export type InsertAnswer = z.infer<typeof insertAnswerSchema>;
export type Answer = typeof answers.$inferSelect;

// Types for the assessment results
export type PerspectiveScore = {
  score: number;
  level: 1 | 2 | 3;
  strengths: string[];
  weaknesses: string[];
};

export type AssessmentResults = {
  organizationManagement: PerspectiveScore;
  systemsFacilities: PerspectiveScore;
  peopleCulture: PerspectiveScore;
  processesInformation: PerspectiveScore;
  overallPlateau: 1 | 2 | 3;
  recommendations: string[];
};

export type ActionItem = {
  id: string;
  description: string;
  perspective: 'organization' | 'systems' | 'people' | 'processes';
  priority: 'high' | 'medium' | 'low';
  timeframe: 'short' | 'medium' | 'long';
  plateauTarget: 1 | 2 | 3;
  completed?: boolean;
};

export type ActionPlan = {
  id?: number;
  assessmentId: number;
  items: ActionItem[];
  createdAt?: Date;
  updatedAt?: Date;
};

// Action Plans Table
export const actionPlans = pgTable("action_plans", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  items: json("items").$type<ActionItem[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const actionPlansRelations = relations(actionPlans, ({ one }) => ({
  assessment: one(assessments, {
    fields: [actionPlans.assessmentId],
    references: [assessments.id]
  })
}));

export const insertActionPlanSchema = createInsertSchema(actionPlans).pick({
  assessmentId: true,
  items: true
});

export type InsertActionPlan = z.infer<typeof insertActionPlanSchema>;
export type ActionPlanModel = typeof actionPlans.$inferSelect;
