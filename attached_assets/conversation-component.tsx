import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock de standaard ANSWER_OPTIONS die normaal uit de constants komen
const DEFAULT_ANSWER_OPTIONS = [
  { value: "yes", label: "Ja, volledig", score: 1.0 },
  { value: "partly", label: "Gedeeltelijk", score: 0.5 },
  { value: "no", label: "Nee", score: 0.0 }
];

// Definieer de basis structuur van de beslisboom
const defaultDecisionTree = {
  startNode: {
    id: "start",
    question: "Welkom bij het assessment gesprek. Laten we eerst even kennismaken en het doel van dit gesprek bespreken. Kun je kort vertellen hoe jullie team is samengesteld en wat jullie voornaamste werkzaamheden zijn?",
    type: "intro",
    nextNode: "perspective_choice"
  },
  nodes: {
    "perspective_choice": {
      id: "perspective_choice",
      question: "Met welk perspectief wil je beginnen?",
      type: "perspective_selector",
      options: [
        { value: "organization", label: "Organisatie & Management", nextNode: "organization_start" },
        { value: "systems", label: "Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "people", label: "Mensen & Cultuur", nextNode: "people_start" },
        { value: "processes", label: "Processen & Informatie", nextNode: "processes_start" }
      ]
    }
  }
};

const ConversationGuide = ({ 
  assessment, 
  team, 
  onSubmitAnswer, 
  decisionTree = defaultDecisionTree,
  questions = [],
  answerOptions = DEFAULT_ANSWER_OPTIONS 
}) => {
  const [currentNode, setCurrentNode] = useState(decisionTree.startNode);
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  
  // Effect om assessmentvragen in te stellen wanneer beschikbaar
  useEffect(() => {
    if (currentNode.questionIds && currentNode.questionIds.length > 0 && questions.length > 0) {
      const foundQuestions = currentNode.questionIds.map(id => 
        questions.find(q => q.id === id)
      ).filter(Boolean);
      setAssessmentQuestions(foundQuestions);
    } else {
      setAssessmentQuestions([]);
    }
  }, [currentNode, questions]);
  
  // Navigeer naar een nieuwe node
  const navigateTo = (nodeId) => {
    // Voeg huidige node toe aan geschiedenis
    setHistory(prev => [...prev, currentNode]);
    
    // Stel nieuwe node in
    const nextNode = decisionTree.nodes[nodeId];
    setCurrentNode(nextNode);
    
    // Reset de geselecteerde antwoorden en notities
    setSelectedAnswer('');
    setNotes('');
  };
  
  // Ga terug naar de vorige node
  const navigateBack = () => {
    if (history.length > 0) {
      const prevNode = history[history.length - 1];
      setCurrentNode(prevNode);
      setHistory(prev => prev.slice(0, -1));
      setSelectedAnswer('');
      setNotes('');
    }
  };
  
  // Verwerk antwoord en bepaal volgende node
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    
    // Als er assessmentvragen zijn, stuur de antwoorden naar de parent component
    if (assessmentQuestions.length > 0 && currentNode.type === 'assessment') {
      assessmentQuestions.forEach(question => {
        if (question) {
          onSubmitAnswer(
            question.id,
            answer,
            notes,
            question.perspectiveId,
            question.plateauId,
            question.levelId
          );
        }
      });
    }
  };
  
  // Verwerk navigatie naar volgende node
  const handleNext = () => {
    if (currentNode.nextNode) {
      navigateTo(currentNode.nextNode);
    } else if (currentNode.options && currentNode.options.length > 0 && selectedAnswer) {
      const selectedOption = currentNode.options.find(opt => opt.value === selectedAnswer);
      if (selectedOption && selectedOption.nextNode) {
        navigateTo(selectedOption.nextNode);
      }
    }
  };
  
  // Render verschillende vraagtypen
  const renderQuestionContent = () => {
    switch (currentNode.type) {
      case 'assessment':
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-md p-4">
              {assessmentQuestions.length > 0 ? (
                assessmentQuestions.map((question, index) => (
                  <div key={question.id} className={index > 0 ? 'mt-4' : ''}>
                    <p className="font-medium mb-1">{question.text}</p>
                    <p className="text-sm text-muted-foreground mb-3">{question.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm italic text-muted-foreground">Geen specifieke assessmentvragen beschikbaar voor dit onderwerp</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Selecteer een antwoord:</label>
              <Select value={selectedAnswer} onValueChange={handleAnswer}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een antwoord" />
                </SelectTrigger>
                <SelectContent>
                  {answerOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 'conversation':
      case 'intro':
      case 'open':
        return (
          <div className="bg-muted rounded-md p-4">
            <p className="text-sm italic text-muted-foreground">
              Open vraag om het gesprek te faciliteren. Noteer de belangrijkste punten hieronder.
            </p>
          </div>
        );
        
      case 'perspective_selector':
      case 'conclusion':
        return (
          <div className="space-y-2">
            <div className="bg-muted rounded-md p-4">
              <p className="text-sm italic text-muted-foreground">
                Kies waar het gesprek naartoe moet gaan.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kies een optie:</label>
              <Select value={selectedAnswer} onValueChange={handleAnswer}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een optie" />
                </SelectTrigger>
                <SelectContent>
                  {currentNode.options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 'finish':
        return (
          <div className="bg-green-50 rounded-md p-4 border border-green-200">
            <p className="text-sm text-green-800">
              Het assessment is nu compleet. Alle antwoorden zijn opgeslagen.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Markeer de vraag met perspectief en plateau informatie
  const renderQuestionHeader = () => {
    if (!currentNode.perspectiveId) {
      return currentNode.question;
    }
    
    let plateauLabel = "";
    if (currentNode.plateauId === "reactive") plateauLabel = "Reactief";
    if (currentNode.plateauId === "proactive") plateauLabel = "Proactief";
    if (currentNode.plateauId === "innovative") plateauLabel = "Innovatief";
    
    let perspectiveLabel = "";
    if (currentNode.perspectiveId === "organization") perspectiveLabel = "Organisatie & Management";
    if (currentNode.perspectiveId === "systems") perspectiveLabel = "Systemen & Faciliteiten";
    if (currentNode.perspectiveId === "people") perspectiveLabel = "Mensen & Cultuur";
    if (currentNode.perspectiveId === "processes") perspectiveLabel = "Processen & Informatie";
    
    return (
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {perspectiveLabel && (
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {perspectiveLabel}
            </span>
          )}
          {plateauLabel && (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
              {plateauLabel}
            </span>
          )}
          {currentNode.levelId && (
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              {currentNode.levelId === "organization" ? "Organisatie" : 
               currentNode.levelId === "team" ? "Team" : "Individueel"} niveau
            </span>
          )}
        </div>
        <p>{currentNode.question}</p>
      </div>
    );
  };
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Gespreksleidraad</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Team: <span className="font-medium">{team?.name || 'Onbekend'}</span></span>
          <span className="mx-2">•</span>
          <span>Coach: <span className="font-medium">{assessment?.coachName || 'Onbekend'}</span></span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="mb-4">
          {renderQuestionHeader()}
        </div>
        
        {renderQuestionContent()}
        
        <div className="mt-4">
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Aantekeningen
          </label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Noteer hier de belangrijkste punten uit het gesprek..."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          variant="outline" 
          onClick={navigateBack}
          disabled={history.length === 0}
        >
          Terug
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={
            (currentNode.type === 'assessment' && !selectedAnswer) || 
            (currentNode.options && !selectedAnswer) ||
            currentNode.type === 'finish'
          }
        >
          {currentNode.type === 'finish' ? 'Afronden' : 'Volgende'}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Hulpfunctie voor het importeren van een volledige beslisboomstructuur
const importDecisionTree = (decisionTreeData) => {
  if (decisionTreeData && decisionTreeData.startNode && decisionTreeData.nodes) {
    return decisionTreeData;
  }
  return defaultDecisionTree;
};

export { importDecisionTree };
export default ConversationGuide;
