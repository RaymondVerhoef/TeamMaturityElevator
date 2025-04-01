import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeamSchema, insertAssessmentSchema, insertAnswerSchema, insertActionPlanSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Teams routes
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  });

  app.get("/api/teams/:id", async (req, res) => {
    try {
      const teamId = parseInt(req.params.id);
      const team = await storage.getTeam(teamId);
      
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team" });
    }
  });

  app.post("/api/teams", async (req, res) => {
    try {
      const teamData = insertTeamSchema.parse(req.body);
      const team = await storage.createTeam(teamData);
      res.status(201).json(team);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid team data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create team" });
    }
  });

  // Assessments routes
  app.get("/api/assessments", async (req, res) => {
    try {
      const teamId = req.query.teamId ? parseInt(req.query.teamId as string) : undefined;
      
      if (teamId) {
        const assessments = await storage.getAssessmentsByTeam(teamId);
        return res.json(assessments);
      }
      
      res.status(400).json({ message: "teamId query parameter is required" });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      const assessment = await storage.getAssessment(assessmentId);
      
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessment" });
    }
  });

  app.post("/api/assessments", async (req, res) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(assessmentData);
      res.status(201).json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create assessment" });
    }
  });

  app.put("/api/assessments/:id/results", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      const results = req.body;
      
      const assessment = await storage.updateAssessmentResults(assessmentId, results);
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update assessment results" });
    }
  });

  // Answers routes
  app.get("/api/assessments/:id/answers", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      const answers = await storage.getAnswersByAssessment(assessmentId);
      res.json(answers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch answers" });
    }
  });

  app.post("/api/answers", async (req, res) => {
    try {
      const answerData = insertAnswerSchema.parse(req.body);
      
      // Check if answer already exists
      const existingAnswer = await storage.getAnswer(answerData.assessmentId, answerData.questionId);
      
      if (existingAnswer) {
        // Update existing answer
        const updatedAnswer = await storage.updateAnswer(existingAnswer.id, answerData);
        return res.json(updatedAnswer);
      }
      
      // Create new answer
      const answer = await storage.createAnswer(answerData);
      res.status(201).json(answer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid answer data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save answer" });
    }
  });
  
  // Action Plan routes
  app.get("/api/assessments/:id/action-plan", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      const actionPlan = await storage.getActionPlan(assessmentId);
      
      if (!actionPlan) {
        return res.status(404).json({ message: "Action plan not found" });
      }
      
      res.json(actionPlan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch action plan" });
    }
  });
  
  app.post("/api/assessments/:id/action-plan", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      
      // Validate action plan data
      const actionPlanData = {
        ...req.body,
        assessmentId
      };
      
      // Create or update action plan
      const actionPlan = await storage.createActionPlan(actionPlanData);
      res.status(201).json(actionPlan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid action plan data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save action plan" });
    }
  });
  
  app.put("/api/assessments/:id/action-plan", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      
      // Validate action plan data
      const actionPlanData = {
        ...req.body,
        assessmentId
      };
      
      // Update action plan
      const actionPlan = await storage.updateActionPlan(assessmentId, actionPlanData);
      res.json(actionPlan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid action plan data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update action plan" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
