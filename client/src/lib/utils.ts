import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ANSWER_OPTIONS, type Question } from "./constants";
import type { Answer, AssessmentResults } from "@shared/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate the score for a single perspective
export function calculatePerspectiveScore(questions: Question[], answers: Answer[]) {
  const perspectiveQuestions = questions.filter(q => q.perspectiveId === questions[0].perspectiveId);
  let totalPossibleScore = perspectiveQuestions.length;
  let actualScore = 0;
  
  for (const question of perspectiveQuestions) {
    const answer = answers.find(a => a.questionId === question.id);
    if (answer) {
      const option = ANSWER_OPTIONS.find(o => o.value === answer.answer);
      if (option) {
        actualScore += option.score;
      }
    }
  }
  
  // Calculate the score on a scale from 1-3
  const scorePercentage = actualScore / totalPossibleScore;
  const scaledScore = 1 + (scorePercentage * 2); // Scale from 1 to 3
  
  return Math.round(scaledScore * 10) / 10; // Round to 1 decimal place
}

// Calculate the score for questions of a specific perspective and plateau
export function calculatePlateauScore(perspectiveId: string, plateauId: string, questions: Question[], answers: Answer[]) {
  const filteredQuestions = questions.filter(
    q => q.perspectiveId === perspectiveId && q.plateauId === plateauId
  );
  
  if (filteredQuestions.length === 0) return 0;
  
  let totalPossibleScore = filteredQuestions.length;
  let actualScore = 0;
  
  for (const question of filteredQuestions) {
    const answer = answers.find(a => a.questionId === question.id);
    if (answer) {
      const option = ANSWER_OPTIONS.find(o => o.value === answer.answer);
      if (option) {
        actualScore += option.score;
      }
    }
  }
  
  return actualScore / totalPossibleScore; // Return as a percentage (0-1)
}

// Determine the appropriate plateau to show for a perspective based on answered questions
export function determineAppropriatePlateau(perspectiveId: string, questions: Question[], answers: Answer[]): string {
  // Calculate scores for each plateau
  const reactiveScore = calculatePlateauScore(perspectiveId, "reactive", questions, answers);
  
  // Get reactive questions count to check if we've answered enough of them
  const reactiveQuestions = questions.filter(
    q => q.perspectiveId === perspectiveId && q.plateauId === "reactive"
  );
  
  const reactiveAnswered = answers.filter(
    a => a.perspectiveId === perspectiveId && a.plateauId === "reactive"
  );
  
  // If not enough reactive questions have been answered, stick with reactive
  if (reactiveAnswered.length < reactiveQuestions.length * 0.75) {
    return "reactive";
  }
  
  // If reactive score is high, move to proactive
  if (reactiveScore >= 0.8) {
    const proactiveScore = calculatePlateauScore(perspectiveId, "proactive", questions, answers);
    const proactiveQuestions = questions.filter(
      q => q.perspectiveId === perspectiveId && q.plateauId === "proactive"
    );
    
    const proactiveAnswered = answers.filter(
      a => a.perspectiveId === perspectiveId && a.plateauId === "proactive"
    );
    
    // If not enough proactive questions have been answered, move to proactive
    if (proactiveAnswered.length < proactiveQuestions.length * 0.75) {
      return "proactive";
    }
    
    // If proactive score is high, move to innovative
    if (proactiveScore >= 0.8) {
      return "innovative";
    }
    
    return "proactive";
  }
  
  return "reactive";
}

// Determine the plateau level based on perspective scores
export function determinePlateau(scores: {
  organizationManagement: number;
  systemsFacilities: number;
  peopleCulture: number;
  processesInformation: number;
}): 1 | 2 | 3 {
  const average = (
    scores.organizationManagement +
    scores.systemsFacilities +
    scores.peopleCulture +
    scores.processesInformation
  ) / 4;
  
  if (average < 1.8) return 1;
  if (average < 2.5) return 2;
  return 3;
}

// Calculate strengths and weaknesses for a perspective
export function calculateStrengthsAndWeaknesses(
  perspectiveId: string,
  questions: Question[],
  answers: Answer[]
): { strengths: string[], weaknesses: string[] } {
  const perspectiveQuestions = questions.filter(q => q.perspectiveId === perspectiveId);
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  for (const question of perspectiveQuestions) {
    const answer = answers.find(a => a.questionId === question.id);
    
    if (answer) {
      if (answer.answer === "yes") {
        strengths.push(question.text);
      } else if (answer.answer === "no") {
        weaknesses.push(question.text);
      }
    }
  }
  
  return { strengths, weaknesses };
}

// Generate assessment results
export function generateAssessmentResults(questions: Question[], answers: Answer[]): AssessmentResults {
  // Group questions by perspective
  const organizationQuestions = questions.filter(q => q.perspectiveId === "organization");
  const systemsQuestions = questions.filter(q => q.perspectiveId === "systems");
  const peopleQuestions = questions.filter(q => q.perspectiveId === "people");
  const processesQuestions = questions.filter(q => q.perspectiveId === "processes");
  
  // Calculate scores for each perspective
  const organizationScore = calculatePerspectiveScore(organizationQuestions, answers);
  const systemsScore = calculatePerspectiveScore(systemsQuestions, answers);
  const peopleScore = calculatePerspectiveScore(peopleQuestions, answers);
  const processesScore = calculatePerspectiveScore(processesQuestions, answers);
  
  // Calculate strengths and weaknesses
  const orgStrengthsWeaknesses = calculateStrengthsAndWeaknesses("organization", questions, answers);
  const sysStrengthsWeaknesses = calculateStrengthsAndWeaknesses("systems", questions, answers);
  const peopleStrengthsWeaknesses = calculateStrengthsAndWeaknesses("people", questions, answers);
  const processesStrengthsWeaknesses = calculateStrengthsAndWeaknesses("processes", questions, answers);
  
  // Determine overall plateau
  const overallPlateau = determinePlateau({
    organizationManagement: organizationScore,
    systemsFacilities: systemsScore,
    peopleCulture: peopleScore,
    processesInformation: processesScore
  });
  
  // Generate recommendations based on weaknesses
  const recommendations: string[] = [];
  
  if (orgStrengthsWeaknesses.weaknesses.length > 0) {
    recommendations.push("Verbeter de rollen en governance structuur binnen het team");
  }
  
  if (sysStrengthsWeaknesses.weaknesses.length > 0) {
    recommendations.push("Investeer in betere tools en samenwerkingsfaciliteiten");
  }
  
  if (peopleStrengthsWeaknesses.weaknesses.length > 0) {
    recommendations.push("Organiseer een workshop over de basisprincipes van Haags werken");
  }
  
  if (processesStrengthsWeaknesses.weaknesses.length > 0) {
    recommendations.push("Documenteer teamafspraken en leg deze vast in een toegankelijk format");
  }
  
  return {
    organizationManagement: {
      score: organizationScore,
      level: Math.round(organizationScore) as 1 | 2 | 3,
      strengths: orgStrengthsWeaknesses.strengths,
      weaknesses: orgStrengthsWeaknesses.weaknesses
    },
    systemsFacilities: {
      score: systemsScore,
      level: Math.round(systemsScore) as 1 | 2 | 3,
      strengths: sysStrengthsWeaknesses.strengths,
      weaknesses: sysStrengthsWeaknesses.weaknesses
    },
    peopleCulture: {
      score: peopleScore,
      level: Math.round(peopleScore) as 1 | 2 | 3,
      strengths: peopleStrengthsWeaknesses.strengths,
      weaknesses: peopleStrengthsWeaknesses.weaknesses
    },
    processesInformation: {
      score: processesScore,
      level: Math.round(processesScore) as 1 | 2 | 3,
      strengths: processesStrengthsWeaknesses.strengths,
      weaknesses: processesStrengthsWeaknesses.weaknesses
    },
    overallPlateau,
    recommendations
  };
}

export function getProgressPercentage(questions: Question[], answers: Answer[]): number {
  if (questions.length === 0) return 0;
  return Math.round((answers.length / questions.length) * 100);
}
