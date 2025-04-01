import { useEffect } from "react";
import { useParams, useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PLATEAUS } from "@/lib/constants";
import Header from "@/components/Header";
import SpiderChart from "@/components/results/SpiderChart";
import ResultSummary from "@/components/results/ResultSummary";
import type { Assessment, Team } from "@shared/schema";

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const assessmentId = parseInt(id);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Fetch assessment data with refetch capability
  const { 
    data: assessment, 
    isLoading: isLoadingAssessment,
    refetch: refetchAssessment,
    error: assessmentError
  } = useQuery<Assessment>({
    queryKey: [`/api/assessments/${assessmentId}`],
    retry: 3,
    staleTime: 0 // Always get fresh data
  });
  
  // Fetch team data
  const { data: team, isLoading: isLoadingTeam } = useQuery<Team>({
    queryKey: [`/api/teams/${assessment?.teamId}`],
    enabled: !!assessment?.teamId,
  });
  
  // Handle PDF download
  const handleDownloadPdf = () => {
    toast({
      title: "PDF genereren",
      description: "Het rapport wordt gegenereerd en gedownload.",
    });
    // In a real implementation, this would generate a PDF
  };
  
  // If assessment results are missing, try to refetch periodically
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (assessment && !assessment.results) {
      // If we have assessment but no results, it might be in the process of being finalized
      timer = setTimeout(() => {
        refetchAssessment();
      }, 1500);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [assessment, refetchAssessment]);
  
  // If loading, show loading state
  if (isLoadingAssessment || isLoadingTeam) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-primary">Laden...</p>
              <p className="text-muted-foreground mt-2">Assessment resultaten worden opgehaald</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Check if assessment exists
  if (!assessment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-primary">Assessment niet gevonden</p>
              <p className="text-muted-foreground mt-2">Het opgegeven assessment ID bestaat niet.</p>
              <Button className="mt-4" asChild>
                <Link href="/">Terug naar dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // If assessment has no results yet, show waiting state
  if (!assessment.results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-primary">Resultaten worden verwerkt...</p>
              <p className="text-muted-foreground mt-2">Even geduld terwijl de assessment resultaten worden berekend.</p>
              <Button 
                className="mt-4" 
                onClick={() => refetchAssessment()}
              >
                Probeer opnieuw
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const { results } = assessment;
  
  return (
    <div className="min-h-screen bg-background flex flex-col font-inter">
      <Header userName={assessment.coachName} showUser={true} />
      
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary">Assessment Resultaten</h1>
              <p className="text-muted-foreground mt-1">Team: {team?.name} | Coach: {assessment.coachName}</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link href="/">Terug naar dashboard</Link>
              </Button>
              <Button onClick={handleDownloadPdf}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Maturity Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <SpiderChart 
                    orgScore={results.organizationManagement.score} 
                    sysScore={results.systemsFacilities.score} 
                    peopleScore={results.peopleCulture.score} 
                    processScore={results.processesInformation.score} 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Organisatie &amp; Management</span>
                      <span className="text-sm text-secondary font-semibold">{results.organizationManagement.score.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                      <div 
                        className="h-full bg-secondary transition-all duration-300 ease-in-out" 
                        style={{ width: `${(results.organizationManagement.score / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Systemen &amp; Faciliteiten</span>
                      <span className="text-sm text-secondary font-semibold">{results.systemsFacilities.score.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                      <div 
                        className="h-full bg-secondary transition-all duration-300 ease-in-out" 
                        style={{ width: `${(results.systemsFacilities.score / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Mensen &amp; Cultuur</span>
                      <span className="text-sm text-secondary font-semibold">{results.peopleCulture.score.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                      <div 
                        className="h-full bg-secondary transition-all duration-300 ease-in-out" 
                        style={{ width: `${(results.peopleCulture.score / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Processen &amp; Informatie</span>
                      <span className="text-sm text-secondary font-semibold">{results.processesInformation.score.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                      <div 
                        className="h-full bg-secondary transition-all duration-300 ease-in-out" 
                        style={{ width: `${(results.processesInformation.score / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted rounded-md p-3 mt-4 border border-border">
                  <div className="text-sm font-semibold text-primary mb-1">
                    Huidige plateau: <span className="text-muted-foreground">{PLATEAUS[`plateau${results.overallPlateau}`]?.name || `Plateau ${results.overallPlateau}`}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {results.overallPlateau === 1 && 
                      "Het team heeft een solide basis voor samenwerking en werkwijzen voor Haags Werken gelegd, maar kan nog groeien op alle vier de perspectieven."}
                    {results.overallPlateau === 2 && 
                      "Het team anticipeert op veranderingen, werkt met gestructureerde processen en zet in op continue verbetering."}
                    {results.overallPlateau === 3 && 
                      "Het team is wendbaar en innovatief, gericht op waarde creatie en kan zich aanpassen aan een dynamische omgeving."}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <ResultSummary results={results} />
          </div>
        </div>
      </main>
    </div>
  );
}
