import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { PERSPECTIVES, LEVELS, PLATEAUS, QUESTIONS } from "@/lib/constants";
import { getProgressPercentage, generateAssessmentResults, determineAppropriatePlateau } from "@/lib/utils";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import QuestionCard from "@/components/questions/QuestionCard";
import type { Assessment as AssessmentType, Team, Answer } from "@shared/schema";

export default function Assessment() {
  const { id } = useParams<{ id: string }>();
  const assessmentId = parseInt(id);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [currentPerspective, setCurrentPerspective] = useState(PERSPECTIVES.organization.id);
  const [currentPlateau, setCurrentPlateau] = useState(PLATEAUS.reactive.id);
  const [autoAdaptPlateau, setAutoAdaptPlateau] = useState(true);
  
  // Fetch assessment data
  const { data: assessment, isLoading: isLoadingAssessment } = useQuery<AssessmentType>({
    queryKey: [`/api/assessments/${assessmentId}`],
  });
  
  // Fetch team data
  const { data: team } = useQuery<Team>({
    queryKey: [`/api/teams/${assessment?.teamId}`],
    enabled: !!assessment?.teamId,
  });
  
  // Fetch answers for this assessment
  const { data: answers = [], isLoading: isLoadingAnswers } = useQuery<Answer[]>({
    queryKey: [`/api/assessments/${assessmentId}/answers`]
  });
  
  // Update plateau when answers change
  useEffect(() => {
    if (autoAdaptPlateau && answers.length > 0) {
      const appropriatePlateau = determineAppropriatePlateau(currentPerspective, QUESTIONS, answers);
      setCurrentPlateau(appropriatePlateau);
    }
  }, [answers, autoAdaptPlateau, currentPerspective]);
  
  // Save answer mutation
  const saveAnswer = useMutation({
    mutationFn: async (data: {
      assessmentId: number;
      perspectiveId: string;
      plateauId: string;
      levelId: string;
      questionId: string;
      answer: string;
      notes?: string;
    }) => {
      const res = await apiRequest("POST", "/api/answers", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/assessments/${assessmentId}/answers`] });
    },
    onError: (error) => {
      toast({
        title: "Fout bij opslaan antwoord",
        description: String(error),
        variant: "destructive",
      });
    },
  });
  
  // Finalize assessment mutation
  const finalizeAssessment = useMutation({
    mutationFn: async () => {
      const results = generateAssessmentResults(QUESTIONS, answers);
      const res = await apiRequest("PUT", `/api/assessments/${assessmentId}/results`, results);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Assessment afgerond",
        description: "De resultaten zijn verwerkt en beschikbaar om te bekijken.",
      });
      setLocation(`/results/${assessmentId}`);
    },
    onError: (error) => {
      toast({
        title: "Fout bij afronden assessment",
        description: String(error),
        variant: "destructive",
      });
    },
  });
  
  // Handle perspective change
  const handlePerspectiveChange = (perspectiveId: string) => {
    setCurrentPerspective(perspectiveId);
    
    // Auto-adapt is handled in the useEffect
  };
  
  // Handle question answer
  const handleQuestionAnswer = (
    questionId: string, 
    answer: string, 
    notes: string = "",
    perspectiveId: string, 
    plateauId: string, 
    levelId: string
  ) => {
    saveAnswer.mutate({
      assessmentId,
      perspectiveId,
      plateauId,
      levelId,
      questionId,
      answer,
      notes: notes || undefined
    });
  };
  
  // Get questions for current perspective and plateau
  const perspectiveQuestions = QUESTIONS.filter(
    q => q.perspectiveId === currentPerspective && q.plateauId === currentPlateau
  );
  
  // Group questions by level
  const questionsByLevel = {
    organization: perspectiveQuestions.filter(q => q.levelId === LEVELS.organization.id),
    team: perspectiveQuestions.filter(q => q.levelId === LEVELS.team.id),
    individual: perspectiveQuestions.filter(q => q.levelId === LEVELS.individual.id),
  };
  
  // Navigate to next perspective
  const handleNextPerspective = () => {
    const perspectives = Object.values(PERSPECTIVES);
    const currentIndex = perspectives.findIndex(p => p.id === currentPerspective);
    if (currentIndex < perspectives.length - 1) {
      setCurrentPerspective(perspectives[currentIndex + 1].id);
      window.scrollTo(0, 0);
    } else {
      // If we're on the last perspective, offer to finalize
      if (getProgressPercentage(QUESTIONS, answers) >= 90) {
        finalizeAssessment.mutate();
      } else {
        toast({
          title: "Assessment niet volledig",
          description: "Beantwoord minimaal 90% van de vragen om het assessment af te ronden.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Navigate to previous perspective
  const handlePreviousPerspective = () => {
    const perspectives = Object.values(PERSPECTIVES);
    const currentIndex = perspectives.findIndex(p => p.id === currentPerspective);
    if (currentIndex > 0) {
      setCurrentPerspective(perspectives[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };
  
  // If loading, show loading state
  if (isLoadingAssessment || isLoadingAnswers) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-primary">Laden...</p>
              <p className="text-muted-foreground mt-2">Assessment gegevens worden opgehaald</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col font-inter">
      <Header 
        userName={assessment?.coachName} 
        showUser={true} 
      />
      
      <div className="flex-grow flex">
        <Sidebar 
          teamName={team?.name || ""} 
          coachName={assessment?.coachName || ""} 
          assessmentDate={assessment?.date ? new Date(assessment.date).toLocaleDateString('nl-NL') : ""} 
          currentPerspective={currentPerspective}
          perspectives={Object.values(PERSPECTIVES)}
          onPerspectiveChange={handlePerspectiveChange}
          progress={getProgressPercentage(QUESTIONS, answers)}
        />
        
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
            {/* Assessment Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-inter font-bold text-2xl text-primary">Team Maturity Assessment</h1>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Voortgang opgeslagen",
                      description: "Je kunt later verdergaan met dit assessment."
                    });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Sla voortgang op
                </Button>
              </div>
              
              <div className="md:hidden mb-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary transition-all duration-300 ease-in-out" 
                    style={{ width: `${getProgressPercentage(QUESTIONS, answers)}%` }}
                  ></div>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">{getProgressPercentage(QUESTIONS, answers)}% complete</div>
              </div>
              
              <Card className="bg-white shadow-sm rounded-md">
                <CardContent className="p-4 md:p-6">
                  {/* Current perspective overview */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-inter font-semibold text-xl">
                      <span className="text-primary">{PERSPECTIVES[currentPerspective].name}</span>
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="auto-adapt"
                          checked={autoAdaptPlateau}
                          onCheckedChange={setAutoAdaptPlateau}
                        />
                        <label 
                          htmlFor="auto-adapt" 
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          Adaptieve vragen
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Plateau:</span>
                        <select 
                          className="border border-input rounded-md py-1 px-2 text-sm font-medium"
                          value={currentPlateau}
                          onChange={(e) => setCurrentPlateau(e.target.value)}
                          disabled={autoAdaptPlateau}
                        >
                          {Object.values(PLATEAUS).map((plateau) => (
                            <option key={plateau.id} value={plateau.id}>
                              {plateau.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 text-base">
                    {PERSPECTIVES[currentPerspective].description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.values(LEVELS).map((level) => (
                      <div key={level.id} className="bg-muted rounded-md p-3">
                        <div className="text-sm font-semibold text-primary mb-1">{level.name}</div>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Assessment Questions */}
            <div className="space-y-6">
              {/* Organization Level Questions */}
              {questionsByLevel.organization.length > 0 && (
                <Card className="bg-white shadow-sm rounded-md overflow-hidden">
                  <div className="border-b border-border p-4 md:p-6">
                    <h3 className="font-inter font-semibold text-lg text-primary">{LEVELS.organization.name}</h3>
                  </div>
                  
                  {questionsByLevel.organization.map((question, index) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      answers={answers}
                      onAnswer={handleQuestionAnswer}
                      isLast={index === questionsByLevel.organization.length - 1}
                    />
                  ))}
                </Card>
              )}
              
              {/* Team Level Questions */}
              {questionsByLevel.team.length > 0 && (
                <Card className="bg-white shadow-sm rounded-md overflow-hidden">
                  <div className="border-b border-border p-4 md:p-6">
                    <h3 className="font-inter font-semibold text-lg text-primary">{LEVELS.team.name}</h3>
                  </div>
                  
                  {questionsByLevel.team.map((question, index) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      answers={answers}
                      onAnswer={handleQuestionAnswer}
                      isLast={index === questionsByLevel.team.length - 1}
                    />
                  ))}
                </Card>
              )}
              
              {/* Individual Level Questions */}
              {questionsByLevel.individual.length > 0 && (
                <Card className="bg-white shadow-sm rounded-md overflow-hidden">
                  <div className="border-b border-border p-4 md:p-6">
                    <h3 className="font-inter font-semibold text-lg text-primary">{LEVELS.individual.name}</h3>
                  </div>
                  
                  {questionsByLevel.individual.map((question, index) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      answers={answers}
                      onAnswer={handleQuestionAnswer}
                      isLast={index === questionsByLevel.individual.length - 1}
                    />
                  ))}
                </Card>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePreviousPerspective}
                  disabled={currentPerspective === PERSPECTIVES.organization.id}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Vorige
                </Button>
                
                <Button
                  onClick={handleNextPerspective}
                  disabled={finalizeAssessment.isPending}
                >
                  {currentPerspective === PERSPECTIVES.processes.id ? (
                    finalizeAssessment.isPending ? "Afronden..." : "Rond assessment af"
                  ) : (
                    <>
                      Volgende
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
