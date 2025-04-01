import { 
  users, teams, assessments, answers,
  type User, type InsertUser,
  type Team, type InsertTeam,
  type Assessment, type InsertAssessment,
  type Answer, type InsertAnswer,
  type AssessmentResults
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teams: Map<number, Team>;
  private assessments: Map<number, Assessment>;
  private answers: Map<number, Answer>;
  
  private userId: number;
  private teamId: number;
  private assessmentId: number;
  private answerId: number;

  constructor() {
    this.users = new Map();
    this.teams = new Map();
    this.assessments = new Map();
    this.answers = new Map();
    
    this.userId = 1;
    this.teamId = 1;
    this.assessmentId = 1;
    this.answerId = 1;
    
    // Seed with some initial teams
    this.createTeam({ name: "Frontend DevOps", department: "IT" });
    this.createTeam({ name: "Backend Development", department: "IT" });
    this.createTeam({ name: "UX/UI Team", department: "Design" });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Team methods
  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }
  
  async getTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }
  
  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = this.teamId++;
    const team: Team = { ...insertTeam, id, createdAt: new Date() };
    this.teams.set(id, team);
    return team;
  }
  
  // Assessment methods
  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }
  
  async getAssessmentsByTeam(teamId: number): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(
      (assessment) => assessment.teamId === teamId
    );
  }
  
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.assessmentId++;
    const assessment: Assessment = { 
      ...insertAssessment, 
      id, 
      date: new Date(), 
      status: "in_progress",
      results: undefined
    };
    this.assessments.set(id, assessment);
    return assessment;
  }
  
  async updateAssessmentResults(id: number, results: AssessmentResults): Promise<Assessment> {
    const assessment = await this.getAssessment(id);
    if (!assessment) {
      throw new Error(`Assessment with id ${id} not found`);
    }
    
    const updatedAssessment: Assessment = {
      ...assessment,
      results,
      status: "completed"
    };
    
    this.assessments.set(id, updatedAssessment);
    return updatedAssessment;
  }
  
  // Answer methods
  async getAnswersByAssessment(assessmentId: number): Promise<Answer[]> {
    return Array.from(this.answers.values()).filter(
      (answer) => answer.assessmentId === assessmentId
    );
  }
  
  async getAnswer(assessmentId: number, questionId: string): Promise<Answer | undefined> {
    return Array.from(this.answers.values()).find(
      (answer) => answer.assessmentId === assessmentId && answer.questionId === questionId
    );
  }
  
  async createAnswer(insertAnswer: InsertAnswer): Promise<Answer> {
    const id = this.answerId++;
    const answer: Answer = { ...insertAnswer, id, createdAt: new Date() };
    this.answers.set(id, answer);
    return answer;
  }
  
  async updateAnswer(id: number, answerUpdate: Partial<InsertAnswer>): Promise<Answer> {
    const existingAnswer = this.answers.get(id);
    if (!existingAnswer) {
      throw new Error(`Answer with id ${id} not found`);
    }
    
    const updatedAnswer: Answer = {
      ...existingAnswer,
      ...answerUpdate
    };
    
    this.answers.set(id, updatedAnswer);
    return updatedAnswer;
  }
}

export const storage = new MemStorage();
