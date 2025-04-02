import { 
  users, teams, assessments, answers, actionPlans,
  type User, type InsertUser,
  type Team, type InsertTeam,
  type Assessment, type InsertAssessment,
  type Answer, type InsertAnswer,
  type AssessmentResults, type ActionPlan, type ActionPlanModel, type InsertActionPlan
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
  updateTeam(id: number, team: Partial<InsertTeam>): Promise<Team>;
  deleteTeam(id: number): Promise<boolean>;
  
  // Assessment operations
  getAssessment(id: number): Promise<Assessment | undefined>;
  getAssessmentsByTeam(teamId: number): Promise<Assessment[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessmentResults(id: number, results: AssessmentResults): Promise<Assessment>;
  deleteAssessment(id: number): Promise<boolean>;
  
  // Answer operations
  getAnswersByAssessment(assessmentId: number): Promise<Answer[]>;
  getAnswer(assessmentId: number, questionId: string): Promise<Answer | undefined>;
  createAnswer(answer: InsertAnswer): Promise<Answer>;
  updateAnswer(id: number, answer: Partial<InsertAnswer>): Promise<Answer>;
  
  // Action Plan operations
  getActionPlan(assessmentId: number): Promise<ActionPlan | undefined>;
  createActionPlan(actionPlan: ActionPlan): Promise<ActionPlan>;
  updateActionPlan(assessmentId: number, actionPlan: ActionPlan): Promise<ActionPlan>;
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
    try {
      console.log(`Attempting to fetch team with id ${id}...`);
      const [team] = await db.select().from(teams).where(eq(teams.id, id));
      return team;
    } catch (error) {
      console.error(`Error fetching team with id ${id}:`, error);
      return undefined;
    }
  }
  
  async getTeams(): Promise<Team[]> {
    try {
      console.log("Attempting to fetch teams from database...");
      const result = await db.select().from(teams);
      console.log("Teams fetched successfully:", result);
      return result;
    } catch (error) {
      console.error("Error in getTeams:", error);
      // Return an empty array instead of throwing to avoid breaking the application
      return [];
    }
  }
  
  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    try {
      console.log("Creating new team:", insertTeam);
      const [team] = await db.insert(teams).values(insertTeam).returning();
      console.log("Team created successfully:", team);
      return team;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  }
  
  async updateTeam(id: number, teamData: Partial<InsertTeam>): Promise<Team> {
    try {
      console.log(`Updating team with id ${id}:`, teamData);
      const [updatedTeam] = await db.update(teams)
        .set(teamData)
        .where(eq(teams.id, id))
        .returning();
      
      if (!updatedTeam) {
        console.error(`Team with id ${id} not found for update`);
        throw new Error(`Team with id ${id} not found`);
      }
      
      console.log("Team updated successfully:", updatedTeam);
      return updatedTeam;
    } catch (error) {
      console.error(`Error updating team with id ${id}:`, error);
      throw error;
    }
  }
  
  async deleteTeam(id: number): Promise<boolean> {
    try {
      // Check if team has assessments
      const teamAssessments = await db.select().from(assessments).where(eq(assessments.teamId, id));
      
      if (teamAssessments.length > 0) {
        // If assessments exist, we need to delete them first
        for (const assessment of teamAssessments) {
          // Delete all related answers
          await db.delete(answers).where(eq(answers.assessmentId, assessment.id));
          
          // Delete any associated action plan
          await db.delete(actionPlans).where(eq(actionPlans.assessmentId, assessment.id));
          
          // Delete the assessment
          await db.delete(assessments).where(eq(assessments.id, assessment.id));
        }
      }
      
      // Finally delete the team
      const result = await db.delete(teams).where(eq(teams.id, id)).returning();
      
      return result.length > 0;
    } catch (error) {
      console.error(`Error deleting team with id ${id}:`, error);
      return false;
    }
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
  
  async deleteAssessment(id: number): Promise<boolean> {
    try {
      // First delete all related answers
      await db.delete(answers).where(eq(answers.assessmentId, id));
      
      // Delete any associated action plan
      await db.delete(actionPlans).where(eq(actionPlans.assessmentId, id));
      
      // Finally delete the assessment itself
      const result = await db.delete(assessments).where(eq(assessments.id, id)).returning();
      
      return result.length > 0;
    } catch (error) {
      console.error(`Error deleting assessment with id ${id}:`, error);
      return false;
    }
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
  
  // Action Plan methods
  async getActionPlan(assessmentId: number): Promise<ActionPlan | undefined> {
    const [actionPlan] = await db.select().from(actionPlans).where(eq(actionPlans.assessmentId, assessmentId));
    
    if (!actionPlan) {
      return undefined;
    }
    
    return {
      id: actionPlan.id,
      assessmentId: actionPlan.assessmentId,
      items: actionPlan.items || [],
      createdAt: actionPlan.createdAt || undefined,
      updatedAt: actionPlan.updatedAt || undefined
    };
  }
  
  async createActionPlan(actionPlan: ActionPlan): Promise<ActionPlan> {
    // Check if an action plan for this assessment already exists
    const existingPlan = await this.getActionPlan(actionPlan.assessmentId);
    
    if (existingPlan) {
      // If it exists, update it
      return this.updateActionPlan(actionPlan.assessmentId, actionPlan);
    }
    
    // Otherwise create a new action plan
    const [newActionPlan] = await db.insert(actionPlans)
      .values({
        assessmentId: actionPlan.assessmentId,
        items: actionPlan.items
      })
      .returning();
    
    return {
      id: newActionPlan.id,
      assessmentId: newActionPlan.assessmentId,
      items: newActionPlan.items || [],
      createdAt: newActionPlan.createdAt || undefined,
      updatedAt: newActionPlan.updatedAt || undefined
    };
  }
  
  async updateActionPlan(assessmentId: number, actionPlan: ActionPlan): Promise<ActionPlan> {
    const [updatedActionPlan] = await db.update(actionPlans)
      .set({
        items: actionPlan.items,
        updatedAt: new Date()
      })
      .where(eq(actionPlans.assessmentId, assessmentId))
      .returning();
    
    if (!updatedActionPlan) {
      throw new Error(`Action plan for assessment with id ${assessmentId} not found`);
    }
    
    return {
      id: updatedActionPlan.id,
      assessmentId: updatedActionPlan.assessmentId,
      items: updatedActionPlan.items || [],
      createdAt: updatedActionPlan.createdAt || undefined,
      updatedAt: updatedActionPlan.updatedAt || undefined
    };
  }
}

// Seed the database with initial data
async function seedInitialData() {
  const teamsCount = await db.select({ count: teams.id }).from(teams);
  
  if (teamsCount.length === 0 || teamsCount[0].count === 0) {
    await db.insert(teams).values([
      { name: "Frontend DevOps", domain: "Digitale Dienstverlening", department: "IT" },
      { name: "Backend Development", domain: "Digitale Dienstverlening", department: "IT" },
      { name: "UX/UI Team", domain: "Burgerservices", department: "Design" }
    ]);
    console.log("Database seeded with initial teams");
  }
}

// Initialize the database and seed it
seedInitialData().catch(console.error);

export const storage = new DatabaseStorage();
