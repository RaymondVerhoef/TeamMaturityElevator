import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ANSWER_OPTIONS } from "@/lib/constants";
import type { Question } from "@/lib/constants";
import type { Answer } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
  answers: Answer[];
  onAnswer: (questionId: string, answer: string, notes: string, perspectiveId: string, plateauId: string, levelId: string) => void;
  isLast: boolean;
}

export default function QuestionCard({ question, answers, onAnswer, isLast }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  // Find existing answer if available
  useEffect(() => {
    const existingAnswer = answers.find(a => a.questionId === question.id);
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer.answer);
      setNotes(existingAnswer.notes || "");
    }
  }, [question.id, answers]);
  
  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswer(
      question.id, 
      answer, 
      notes,
      question.perspectiveId,
      question.plateauId,
      question.levelId
    );
  };
  
  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  
  // Handle notes blur (save when focus leaves)
  const handleNotesBlur = () => {
    if (selectedAnswer) {
      onAnswer(
        question.id, 
        selectedAnswer, 
        notes,
        question.perspectiveId,
        question.plateauId,
        question.levelId
      );
    }
  };
  
  return (
    <div className={`p-4 md:p-6 ${!isLast ? 'border-b border-border' : ''}`}>
      <div className="mb-4">
        <h4 className="font-inter text-base font-medium mb-2">
          {question.text}
        </h4>
        <p className="text-muted-foreground text-sm mb-3">
          {question.description}
        </p>
      </div>
      
      <div className="space-y-3">
        {ANSWER_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center">
            <input 
              type="radio" 
              id={`${question.id}-${option.value}`} 
              name={question.id} 
              className="h-4 w-4 text-primary" 
              checked={selectedAnswer === option.value}
              onChange={() => handleAnswerSelect(option.value)}
            />
            <label htmlFor={`${question.id}-${option.value}`} className="ml-2 text-base">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <label htmlFor={`${question.id}-notes`} className="block text-sm font-medium text-muted-foreground mb-1">
          Toelichting
        </label>
        <Textarea 
          id={`${question.id}-notes`} 
          value={notes}
          onChange={handleNotesChange}
          onBlur={handleNotesBlur}
          className="w-full rounded-md border border-border px-3 py-2 text-base" 
          rows={2} 
          placeholder="Optionele toelichting..."
        />
      </div>
    </div>
  );
}
