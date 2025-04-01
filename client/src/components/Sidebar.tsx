import { cn } from "@/lib/utils";
import type { Perspective } from "@/lib/constants";

interface SidebarProps {
  teamName: string;
  coachName: string;
  assessmentDate: string;
  currentPerspective: string;
  perspectives: Perspective[];
  onPerspectiveChange: (perspectiveId: string) => void;
  progress: number;
}

export default function Sidebar({ 
  teamName, 
  coachName, 
  assessmentDate, 
  currentPerspective,
  perspectives,
  onPerspectiveChange,
  progress 
}: SidebarProps) {
  return (
    <aside className="hidden md:block w-64 border-r border-border bg-white">
      <div className="h-full p-4">
        <div className="mb-6">
          <div className="text-sm font-semibold text-muted-foreground mb-2">Assessment Voortgang</div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs mt-1 text-muted-foreground">{progress}% complete</div>
        </div>
        
        <nav>
          <div className="mb-1 text-sm font-semibold text-muted-foreground">Perspectieven</div>
          <ul className="space-y-1">
            {perspectives.map((perspective) => (
              <li 
                key={perspective.id}
                className={cn(
                  "py-2 px-3 rounded-md text-sm flex items-center cursor-pointer",
                  perspective.id === currentPerspective 
                    ? "bg-primary bg-opacity-10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => onPerspectiveChange(perspective.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={perspective.icon} />
                </svg>
                {perspective.name}
                {perspective.id === currentPerspective && (
                  <span className="ml-auto rounded-full bg-primary text-white text-xs px-2 py-0.5">Huidig</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-6">
          <div className="mb-1 text-sm font-semibold text-muted-foreground">Assessment Details</div>
          <div className="bg-muted rounded-md p-3 text-sm">
            <div className="flex items-start mb-2">
              <span className="text-muted-foreground font-medium w-24">Team:</span>
              <span className="text-foreground">{teamName}</span>
            </div>
            <div className="flex items-start mb-2">
              <span className="text-muted-foreground font-medium w-24">Datum:</span>
              <span className="text-foreground">{assessmentDate}</span>
            </div>
            <div className="flex items-start">
              <span className="text-muted-foreground font-medium w-24">Coach:</span>
              <span className="text-foreground">{coachName}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
