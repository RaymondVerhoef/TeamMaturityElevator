import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLATEAUS } from "@/lib/constants";
import type { AssessmentResults, ActionPlan as ActionPlanType } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ActionPlanProps {
  results: AssessmentResults;
  assessmentId: number;
}

type ActionItem = {
  id: string;
  description: string;
  perspective: 'organization' | 'systems' | 'people' | 'processes';
  priority: 'high' | 'medium' | 'low';
  timeframe: 'short' | 'medium' | 'long';
  plateauTarget: 1 | 2 | 3;
  completed?: boolean;
};

// Generate some specific action items based on weaknesses
function generateActionItems(results: AssessmentResults): ActionItem[] {
  const actionItems: ActionItem[] = [];
  let actionId = 1;
  
  // Process organizational perspective weaknesses
  if (results.organizationManagement.weaknesses.length > 0) {
    // Determine target plateau (move to next level if not already at 3)
    const currentPlateau = results.organizationManagement.level;
    const targetPlateau = currentPlateau < 3 ? (currentPlateau + 1) as 1 | 2 | 3 : 3;
    
    // Add generic action for low scores
    if (results.organizationManagement.score < 1.8) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Definieer duidelijke rollen en verantwoordelijkheden binnen het team",
        perspective: "organization",
        priority: "high",
        timeframe: "short",
        plateauTarget: targetPlateau
      });
    }
    
    if (results.organizationManagement.score < 2.5 && results.organizationManagement.score >= 1.8) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Implementeer een systematische aanpak voor het verzamelen van feedback over teamprocessen",
        perspective: "organization",
        priority: "medium",
        timeframe: "medium",
        plateauTarget: targetPlateau
      });
    }
    
    // Add actions for specific weaknesses
    if (results.organizationManagement.weaknesses.some(w => w.toLowerCase().includes("governance"))) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Ontwikkel een governance framework voor besluitvorming",
        perspective: "organization",
        priority: "high",
        timeframe: "medium",
        plateauTarget: targetPlateau
      });
    }
  }
  
  // Process systems perspective weaknesses
  if (results.systemsFacilities.weaknesses.length > 0) {
    // Determine target plateau
    const currentPlateau = results.systemsFacilities.level;
    const targetPlateau = currentPlateau < 3 ? (currentPlateau + 1) as 1 | 2 | 3 : 3;
    
    // Add generic action for low scores
    if (results.systemsFacilities.score < 1.8) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Inventariseer bestaande tools en identificeer hiaten in de toolset",
        perspective: "systems",
        priority: "high",
        timeframe: "short",
        plateauTarget: targetPlateau
      });
    }
    
    if (results.systemsFacilities.score < 2.5 && results.systemsFacilities.score >= 1.8) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Automatiseer terugkerende taken en processen met geschikte tools",
        perspective: "systems",
        priority: "medium",
        timeframe: "medium",
        plateauTarget: targetPlateau
      });
    }
    
    // Add actions for specific weaknesses
    if (results.systemsFacilities.weaknesses.some(w => w.toLowerCase().includes("samenwerk"))) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Implementeer gezamenlijke werkruimtes en samenwerkingstools",
        perspective: "systems",
        priority: "high",
        timeframe: "short",
        plateauTarget: targetPlateau
      });
    }
  }
  
  // Process people perspective weaknesses
  if (results.peopleCulture.weaknesses.length > 0) {
    // Determine target plateau
    const currentPlateau = results.peopleCulture.level;
    const targetPlateau = currentPlateau < 3 ? (currentPlateau + 1) as 1 | 2 | 3 : 3;
    
    // Add generic action for low scores
    if (results.peopleCulture.score < 1.8) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Organiseer een workshop over de principes van Haags Werken",
        perspective: "people",
        priority: "high",
        timeframe: "short",
        plateauTarget: targetPlateau
      });
    }
    
    if (results.peopleCulture.score < 2.5 && results.peopleCulture.score >= 1.8) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Faciliteer regelmatige kennisdeling sessies binnen het team",
        perspective: "people",
        priority: "medium",
        timeframe: "medium",
        plateauTarget: targetPlateau
      });
    }
    
    // Add actions for specific weaknesses
    if (results.peopleCulture.weaknesses.some(w => w.toLowerCase().includes("kennis"))) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Ontwikkel een kennismanagement systeem voor het delen van expertise",
        perspective: "people",
        priority: "medium",
        timeframe: "medium",
        plateauTarget: targetPlateau
      });
    }
  }
  
  // Process processes perspective weaknesses
  if (results.processesInformation.weaknesses.length > 0) {
    // Determine target plateau
    const currentPlateau = results.processesInformation.level;
    const targetPlateau = currentPlateau < 3 ? (currentPlateau + 1) as 1 | 2 | 3 : 3;
    
    // Add generic action for low scores
    if (results.processesInformation.score < 1.8) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Documenteer bestaande processen en identificeer verbeterpunten",
        perspective: "processes",
        priority: "high",
        timeframe: "short",
        plateauTarget: targetPlateau
      });
    }
    
    if (results.processesInformation.score < 2.5 && results.processesInformation.score >= 1.8) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Implementeer gestructureerde processen voor het beheren van feedback en verbetervoorstellen",
        perspective: "processes",
        priority: "medium",
        timeframe: "medium",
        plateauTarget: targetPlateau
      });
    }
    
    // Add actions for specific weaknesses
    if (results.processesInformation.weaknesses.some(w => w.toLowerCase().includes("document"))) {
      actionItems.push({
        id: `action-${actionId++}`,
        description: "Standaardiseer documentatiestructuren en -processen",
        perspective: "processes",
        priority: "high",
        timeframe: "short",
        plateauTarget: targetPlateau
      });
    }
  }
  
  // Generate a few general recommendations based on the overall plateau
  if (results.overallPlateau === 1) {
    actionItems.push({
      id: `action-${actionId++}`,
      description: "Organiseer een teamdag om gezamenlijke werkafspraken te maken",
      perspective: "organization",
      priority: "high",
      timeframe: "short",
      plateauTarget: 2
    });
  } else if (results.overallPlateau === 2) {
    actionItems.push({
      id: `action-${actionId++}`,
      description: "Start een continu verbeterproces binnen het team",
      perspective: "processes",
      priority: "medium",
      timeframe: "medium",
      plateauTarget: 3
    });
  }
  
  return actionItems;
}

export default function ActionPlan({ results, assessmentId }: ActionPlanProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPerspective, setSelectedPerspective] = useState<string>('all');
  
  // Fetch existing action plan
  const { 
    data: existingActionPlan,
    isLoading,
    isError
  } = useQuery<{
    id: number;
    assessmentId: number;
    items: ActionItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }>({
    queryKey: [`/api/assessments/${assessmentId}/action-plan`],
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Generate initial action items, but use existing ones if available
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  
  useEffect(() => {
    if (existingActionPlan && existingActionPlan.items && existingActionPlan.items.length > 0) {
      setActionItems(existingActionPlan.items);
    } else {
      setActionItems(generateActionItems(results));
    }
  }, [existingActionPlan, results]);
  
  // Mutation to save the action plan
  const saveActionPlanMutation = useMutation({
    mutationFn: async (items: ActionItem[]) => {
      // apiRequest expects the first parameter to be a URL and the second to be options
      const result = await fetch(`/api/assessments/${assessmentId}/action-plan`, {
        method: existingActionPlan ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items })
      });
      
      if (!result.ok) {
        throw new Error('Failed to save action plan');
      }
      
      return await result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/assessments/${assessmentId}/action-plan`] });
      toast({
        title: "Actieplan opgeslagen",
        description: "Het actieplan is opgeslagen en kan worden gedeeld met het team.",
      });
    },
    onError: () => {
      toast({
        title: "Fout bij opslaan",
        description: "Het actieplan kon niet worden opgeslagen. Probeer het later opnieuw.",
        variant: "destructive"
      });
    }
  });
  
  const perspectiveColors: Record<string, string> = {
    organization: 'bg-blue-100 text-blue-800 border-blue-300',
    systems: 'bg-green-100 text-green-800 border-green-300',
    people: 'bg-purple-100 text-purple-800 border-purple-300',
    processes: 'bg-orange-100 text-orange-800 border-orange-300'
  };
  
  const perspectiveNames: Record<string, string> = {
    organization: 'Organisatie & Management',
    systems: 'Systemen & Faciliteiten',
    people: 'Mensen & Cultuur',
    processes: 'Processen & Informatie'
  };
  
  const priorityLabels: Record<string, string> = {
    high: 'Hoog',
    medium: 'Gemiddeld',
    low: 'Laag'
  };
  
  const timeframeLabels: Record<string, string> = {
    short: '1-3 maanden',
    medium: '3-6 maanden',
    long: '6-12 maanden'
  };
  
  const filteredItems = selectedPerspective === 'all' 
    ? actionItems 
    : actionItems.filter(item => item.perspective === selectedPerspective);
  
  const handleSaveActionPlan = () => {
    saveActionPlanMutation.mutate(actionItems);
  };
  
  const handleExportPDF = () => {
    // Show toast and create a downloadable "PDF"
    toast({
      title: "PDF wordt gegenereerd",
      description: "Het actieplan wordt gedownload.",
    });

    try {
      // Prepare the action plan data
      const contentLines = [
        `# Actieplan voor ${results.overallPlateau === 1 ? 'Reactief' : results.overallPlateau === 2 ? 'Proactief' : 'Innovatief'} team`,
        `Datum: ${new Date().toLocaleDateString('nl-NL')}`,
        '',
        '## Actiepunten:',
        ''
      ];
      
      // Add each action item
      actionItems.forEach((item, index) => {
        contentLines.push(`### ${index + 1}. ${item.description}`);
        contentLines.push(`- Perspectief: ${perspectiveNames[item.perspective]}`);
        contentLines.push(`- Prioriteit: ${priorityLabels[item.priority]}`);
        contentLines.push(`- Tijdslijn: ${timeframeLabels[item.timeframe]}`);
        contentLines.push(`- Doel plateau: ${PLATEAUS[`plateau${item.plateauTarget}`]?.name || `Plateau ${item.plateauTarget}`}`);
        contentLines.push('');
      });
      
      // Convert to text content
      const content = contentLines.join('\n');
      
      // Create a blob with the content
      const blob = new Blob([content], { type: 'text/plain' });
      
      // Create a download link and trigger it
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `actieplan_${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Confirm success
      setTimeout(() => {
        toast({
          title: "PDF gedownload",
          description: "Het actieplan is geëxporteerd als Markdown bestand.",
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "Fout bij exporteren",
        description: "Er is een probleem opgetreden bij het genereren van de PDF.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Actieplan</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={handleSaveActionPlan}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Opslaan
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF
            </Button>
          </div>
        </div>
        <div className="text-sm text-muted-foreground pb-2">
          Gebaseerd op de assessment resultaten is hier een actieplan om naar het volgende plateau te groeien
        </div>
        <div className="flex space-x-2 pt-2">
          <Button 
            variant={selectedPerspective === 'all' ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedPerspective('all')}
          >
            Alle
          </Button>
          <Button 
            variant={selectedPerspective === 'organization' ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedPerspective('organization')}
          >
            Organisatie
          </Button>
          <Button 
            variant={selectedPerspective === 'systems' ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedPerspective('systems')}
          >
            Systemen
          </Button>
          <Button 
            variant={selectedPerspective === 'people' ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedPerspective('people')}
          >
            Mensen
          </Button>
          <Button 
            variant={selectedPerspective === 'processes' ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedPerspective('processes')}
          >
            Processen
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Geen actiepunten gevonden voor dit perspectief
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="border rounded-md p-4 relative">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium mr-2 ${perspectiveColors[item.perspective]}`}>
                      {perspectiveNames[item.perspective]}
                    </span>
                    <Badge variant="outline" className="mr-2">{priorityLabels[item.priority]}</Badge>
                    <Badge variant="outline">{timeframeLabels[item.timeframe]}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Doel: {PLATEAUS[`plateau${item.plateauTarget}`]?.name || `Plateau ${item.plateauTarget}`}
                  </div>
                </div>
                <p className="text-base mb-2">{item.description}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}