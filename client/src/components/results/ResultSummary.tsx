import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AssessmentResults } from "@shared/schema";

interface ResultSummaryProps {
  results: AssessmentResults;
}

export default function ResultSummary({ results }: ResultSummaryProps) {
  return (
    <div>
      <CardHeader>
        <CardTitle>Key Observaties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="bg-white rounded-md shadow-sm">
          <CardContent className="p-3">
            <h4 className="font-medium text-base text-primary mb-1">Sterke punten</h4>
            <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
              {results.organizationManagement.strengths.slice(0, 2).map((strength, idx) => (
                <li key={`org-str-${idx}`}>{strength}</li>
              ))}
              {results.systemsFacilities.strengths.slice(0, 1).map((strength, idx) => (
                <li key={`sys-str-${idx}`}>{strength}</li>
              ))}
              {results.peopleCulture.strengths.slice(0, 1).map((strength, idx) => (
                <li key={`ppl-str-${idx}`}>{strength}</li>
              ))}
              {results.processesInformation.strengths.slice(0, 1).map((strength, idx) => (
                <li key={`proc-str-${idx}`}>{strength}</li>
              ))}
              {(
                results.organizationManagement.strengths.length +
                results.systemsFacilities.strengths.length +
                results.peopleCulture.strengths.length +
                results.processesInformation.strengths.length
              ) === 0 && (
                <li>Geen specifieke sterke punten geïdentificeerd</li>
              )}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-md shadow-sm">
          <CardContent className="p-3">
            <h4 className="font-medium text-base text-primary mb-1">Verbeterpunten</h4>
            <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
              {results.organizationManagement.weaknesses.slice(0, 1).map((weakness, idx) => (
                <li key={`org-weak-${idx}`}>{weakness}</li>
              ))}
              {results.systemsFacilities.weaknesses.slice(0, 1).map((weakness, idx) => (
                <li key={`sys-weak-${idx}`}>{weakness}</li>
              ))}
              {results.peopleCulture.weaknesses.slice(0, 1).map((weakness, idx) => (
                <li key={`ppl-weak-${idx}`}>{weakness}</li>
              ))}
              {results.processesInformation.weaknesses.slice(0, 1).map((weakness, idx) => (
                <li key={`proc-weak-${idx}`}>{weakness}</li>
              ))}
              {(
                results.organizationManagement.weaknesses.length +
                results.systemsFacilities.weaknesses.length +
                results.peopleCulture.weaknesses.length +
                results.processesInformation.weaknesses.length
              ) === 0 && (
                <li>Geen specifieke verbeterpunten geïdentificeerd</li>
              )}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-md shadow-sm">
          <CardContent className="p-3">
            <h4 className="font-medium text-base text-primary mb-1">Aanbevelingen</h4>
            <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
              {results.recommendations.map((recommendation, idx) => (
                <li key={`rec-${idx}`}>{recommendation}</li>
              ))}
              {results.recommendations.length === 0 && (
                <li>Ga door met de huidige aanpak en focus op consolidatie van de processen</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </div>
  );
}
