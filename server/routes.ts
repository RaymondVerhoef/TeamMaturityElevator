import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeamSchema, insertAssessmentSchema, insertAnswerSchema, insertActionPlanSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Teams routes
  app.get("/api/teams", async (req, res) => {
    try {
      console.log("Fetching teams...");
      const teams = await storage.getTeams();
      console.log("Teams fetched successfully:", teams);
      res.json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ message: "Failed to fetch teams", error: String(error) });
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
  
  app.put("/api/teams/:id", async (req, res) => {
    try {
      const teamId = parseInt(req.params.id);
      const teamData = insertTeamSchema.partial().parse(req.body);
      
      const team = await storage.updateTeam(teamId, teamData);
      res.json(team);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid team data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update team" });
    }
  });
  
  app.delete("/api/teams/:id", async (req, res) => {
    try {
      const teamId = parseInt(req.params.id);
      const success = await storage.deleteTeam(teamId);
      
      if (success) {
        res.status(200).json({ success: true, message: "Team successfully deleted" });
      } else {
        res.status(404).json({ success: false, message: "Team not found or could not be deleted" });
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete team", 
        error: String(error) 
      });
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
  
  app.delete("/api/assessments/:id", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      const success = await storage.deleteAssessment(assessmentId);
      
      if (success) {
        res.status(200).json({ success: true, message: "Assessment successfully deleted" });
      } else {
        res.status(404).json({ success: false, message: "Assessment not found or could not be deleted" });
      }
    } catch (error) {
      console.error("Error deleting assessment:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete assessment", 
        error: String(error) 
      });
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
      console.log("Fetching action plan for assessment", assessmentId);
      
      try {
        const actionPlan = await storage.getActionPlan(assessmentId);
        
        if (!actionPlan) {
          return res.status(404).json({ 
            success: false, 
            message: "Action plan not found" 
          });
        }
        
        console.log("Action plan fetched:", JSON.stringify(actionPlan));
        return res.status(200).json({ 
          success: true, 
          actionPlan: actionPlan 
        });
      } catch (storageError) {
        console.error("Storage error fetching action plan:", storageError);
        return res.status(500).json({ 
          success: false,
          message: "Failed to fetch action plan from database", 
          error: String(storageError) 
        });
      }
    } catch (error) {
      console.error("Error fetching action plan:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to fetch action plan", 
        error: String(error) 
      });
    }
  });
  
  app.post("/api/assessments/:id/action-plan", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      
      console.log("Creating action plan for assessment", assessmentId);
      console.log("Request body:", JSON.stringify(req.body));
      
      // Validate and prepare action plan data
      if (!req.body.items || !Array.isArray(req.body.items)) {
        return res.status(400).json({ message: "Invalid action plan data: items must be an array" });
      }
      
      const actionPlanData = {
        assessmentId,
        items: req.body.items
      };
      
      try {
        // Create action plan
        const actionPlan = await storage.createActionPlan(actionPlanData);
        console.log("Action plan created:", JSON.stringify(actionPlan));
        
        // Ensure we're sending valid JSON
        return res.status(201).json({ 
          success: true, 
          actionPlan: actionPlan
        });
      } catch (storageError) {
        console.error("Storage error creating action plan:", storageError);
        return res.status(500).json({ 
          message: "Failed to save action plan in database", 
          error: String(storageError) 
        });
      }
    } catch (error) {
      console.error("Error creating action plan:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid action plan data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to save action plan", error: String(error) });
    }
  });
  
  app.put("/api/assessments/:id/action-plan", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      
      console.log("Updating action plan for assessment", assessmentId);
      console.log("Request body:", JSON.stringify(req.body));
      
      // Validate and prepare action plan data
      if (!req.body.items || !Array.isArray(req.body.items)) {
        return res.status(400).json({ message: "Invalid action plan data: items must be an array" });
      }
      
      const actionPlanData = {
        assessmentId,
        items: req.body.items
      };
      
      try {
        // Update action plan
        const actionPlan = await storage.updateActionPlan(assessmentId, actionPlanData);
        console.log("Action plan updated:", JSON.stringify(actionPlan));
        
        // Ensure we're sending valid JSON
        return res.status(200).json({ 
          success: true, 
          actionPlan: actionPlan
        });
      } catch (storageError) {
        console.error("Storage error updating action plan:", storageError);
        return res.status(500).json({ 
          message: "Failed to update action plan in database", 
          error: String(storageError) 
        });
      }
    } catch (error) {
      console.error("Error updating action plan:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid action plan data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to update action plan", error: String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
