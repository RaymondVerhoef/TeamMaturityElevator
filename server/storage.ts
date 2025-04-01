import { 
  users, teams, assessments, answers,
  type User, type InsertUser,
  type Team, type InsertTeam,
  type Assessment, type InsertAssessment,
  type Answer, type InsertAnswer,
  type AssessmentResults
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Team operations
  getTeam(id: number): Promise<Team | undefined>;
  getTeams(): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;
  
  // Assessment operations
  getAssessment(id: number): Promise<Assessment | undefined>;
  getAssessmentsByTeam(teamId: number): Promise<Assessment[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessmentResults(id: number, results: AssessmentResults): Promise<Assessment>;
  
  // Answer operations
  getAnswersByAssessment(assessmentId: number): Promise<Answer[]>;
  getAnswer(assessmentId: number, questionId: string): Promise<Answer | undefined>;
  createAnswer(answer: InsertAnswer): Promise<Answer>;
  updateAnswer(id: number, answer: Partial<InsertAnswer>): Promise<Answer>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Team methods
  async getTeam(id: number): Promise<Team | undefined> {
    const [team] = await db.select().from(teams).where(eq(teams.id, id));
    return team;
  }
  
  async getTeams(): Promise<Team[]> {
    return await db.select().from(teams);
  }
  
  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const [team] = await db.insert(teams).values(insertTeam).returning();
    return team;
  }
  
  // Assessment methods
  async getAssessment(id: number): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment;
  }
  
  async getAssessmentsByTeam(teamId: number): Promise<Assessment[]> {
    return await db.select().from(assessments).where(eq(assessments.teamId, teamId));
  }
  
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db.insert(assessments)
      .values({
        ...insertAssessment,
        status: "in_progress",
        results: null,  // Initialize with null to avoid TypeScript error
      })
      .returning();
    return assessment;
  }
  
  async updateAssessmentResults(id: number, results: AssessmentResults): Promise<Assessment> {
    const [updatedAssessment] = await db.update(assessments)
      .set({
        results,
        status: "completed"
      })
      .where(eq(assessments.id, id))
      .returning();
    
    if (!updatedAssessment) {
      throw new Error(`Assessment with id ${id} not found`);
    }
    
    return updatedAssessment;
  }
  
  // Answer methods
  async getAnswersByAssessment(assessmentId: number): Promise<Answer[]> {
    return await db.select().from(answers).where(eq(answers.assessmentId, assessmentId));
  }
  
  async getAnswer(assessmentId: number, questionId: string): Promise<Answer | undefined> {
    const [answer] = await db.select().from(answers).where(
      and(
        eq(answers.assessmentId, assessmentId),
        eq(answers.questionId, questionId)
      )
    );
    return answer;
  }
  
  async createAnswer(insertAnswer: InsertAnswer): Promise<Answer> {
    // Check if this answer already exists
    const existingAnswer = await this.getAnswer(
      insertAnswer.assessmentId,
      insertAnswer.questionId
    );
    
    if (existingAnswer) {
      // If it exists, update it
      return this.updateAnswer(existingAnswer.id, insertAnswer);
    }
    
    // Otherwise create a new answer
    const [answer] = await db.insert(answers).values(insertAnswer).returning();
    return answer;
  }
  
  async updateAnswer(id: number, answerUpdate: Partial<InsertAnswer>): Promise<Answer> {
    const [updatedAnswer] = await db.update(answers)
      .set(answerUpdate)
      .where(eq(answers.id, id))
      .returning();
    
    if (!updatedAnswer) {
      throw new Error(`Answer with id ${id} not found`);
    }
    
    return updatedAnswer;
  }
}

// Seed the database with initial data
async function seedInitialData() {
  const teamsCount = await db.select({ count: teams.id }).from(teams);
  
  if (teamsCount.length === 0 || teamsCount[0].count === 0) {
    await db.insert(teams).values([
      { name: "Frontend DevOps", department: "IT" },
      { name: "Backend Development", department: "IT" },
      { name: "UX/UI Team", department: "Design" }
    ]);
    console.log("Database seeded with initial teams");
  }
}

// Initialize the database and seed it
seedInitialData().catch(console.error);

export const storage = new DatabaseStorage();
