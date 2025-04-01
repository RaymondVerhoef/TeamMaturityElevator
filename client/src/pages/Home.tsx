import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import type { Team, Assessment } from "@shared/schema";

export default function Home() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [coachName, setCoachName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  
  // Fetch teams
  const { data: teams, isLoading: isLoadingTeams } = useQuery<Team[]>({
    queryKey: ["/api/teams"],
  });
  
  // Create new assessment mutation
  const createAssessment = useMutation({
    mutationFn: async (data: { teamId: number; coachName: string }) => {
      const res = await apiRequest("POST", "/api/assessments", data);
      return res.json();
    },
    onSuccess: (data: Assessment) => {
      toast({
        title: "Assessment gestart",
        description: `Assessment voor ${teams?.find(t => t.id === data.teamId)?.name} is succesvol aangemaakt.`,
      });
      setLocation(`/assessment/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Fout bij aanmaken assessment",
        description: String(error),
        variant: "destructive",
      });
    },
  });
  
  const handleStartAssessment = () => {
    if (!selectedTeamId) {
      toast({
        title: "Selecteer een team",
        description: "Je moet een team selecteren om een assessment te starten.",
        variant: "destructive",
      });
      return;
    }
    
    if (!coachName) {
      toast({
        title: "Voer je naam in",
        description: "Je moet je naam invoeren om een assessment te starten.",
        variant: "destructive",
      });
      return;
    }
    
    createAssessment.mutate({
      teamId: parseInt(selectedTeamId),
      coachName,
    });
  };
  
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header showUser={false} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8">Team Maturity Assessment Tool</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Start een nieuw assessment</CardTitle>
                <CardDescription>
                  Start een nieuwe maturity assessment voor een team op basis van het Haags Werken framework.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coach-name">Jouw naam (coach)</Label>
                  <Input
                    id="coach-name"
                    placeholder="Voer je naam in"
                    value={coachName}
                    onChange={(e) => setCoachName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="team-select">Selecteer een team</Label>
                  <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                    <SelectTrigger id="team-select">
                      <SelectValue placeholder="Selecteer een team" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingTeams ? (
                        <SelectItem value="loading" disabled>Laden...</SelectItem>
                      ) : (
                        teams?.map((team) => (
                          <SelectItem key={team.id} value={team.id.toString()}>
                            {team.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleStartAssessment}
                  disabled={createAssessment.isPending}
                >
                  {createAssessment.isPending ? "Bezig met aanmaken..." : "Start Assessment"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Over Haags Werken Elevator</CardTitle>
                <CardDescription>
                  Evalueer de volwassenheid van teams volgens het Haags Werken framework
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  De Haags Werken Scan helpt multidisciplinaire teams (MDT's) van de gemeente Den Haag om hun volwassenheid te beoordelen en te verbeteren. De scan biedt duidelijke criteria en richtlijnen voor het bereiken van een hoger volwassenheidsniveau, in lijn met de gemeentelijke doelen en digitaliseringsambities.
                </p>
                
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-semibold mb-2">De vier perspectieven:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Organisatie & Management</li>
                    <li>Systemen & Faciliteiten</li>
                    <li>Mensen & Cultuur</li>
                    <li>Processen & Informatie</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
