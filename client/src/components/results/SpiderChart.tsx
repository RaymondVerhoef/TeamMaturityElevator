import { useEffect, useRef } from "react";

interface SpiderChartProps {
  orgScore: number;
  sysScore: number;
  peopleScore: number;
  processScore: number;
}

export default function SpiderChart({ 
  orgScore, 
  sysScore, 
  peopleScore, 
  processScore 
}: SpiderChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;

    // Normalize values to be between 0 and 1 for plotting
    // where 0 = center (score of 1) and 1 = edge (score of 3)
    const normalizeValue = (value: number) => (value - 1) / 2;
    
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    // Normalized scores (0-1 scale)
    const normOrgScore = normalizeValue(orgScore);
    const normSysScore = normalizeValue(sysScore);
    const normPeopleScore = normalizeValue(peopleScore);
    const normProcessScore = normalizeValue(processScore);
    
    // Calculate points for radar chart
    const topPoint = { 
      x: centerX, 
      y: centerY - (radius * normOrgScore) 
    };
    const rightPoint = { 
      x: centerX + (radius * normSysScore), 
      y: centerY 
    };
    const bottomPoint = { 
      x: centerX, 
      y: centerY + (radius * normProcessScore) 
    };
    const leftPoint = { 
      x: centerX - (radius * normPeopleScore), 
      y: centerY 
    };
    
    // Create data path
    const dataPath = `
      M${topPoint.x},${topPoint.y} 
      L${rightPoint.x},${rightPoint.y} 
      L${bottomPoint.x},${bottomPoint.y} 
      L${leftPoint.x},${leftPoint.y} 
      Z
    `;
    
    // Update the data path in the SVG
    const dataPathElement = svgRef.current.querySelector('.data');
    if (dataPathElement) {
      dataPathElement.setAttribute('d', dataPath);
    }
  }, [orgScore, sysScore, peopleScore, processScore]);
  
  return (
    <svg 
      ref={svgRef}
      className="chart-spider" 
      viewBox="0 0 300 300"
      style={{ 
        height: "300px", 
        width: "300px", 
        position: "relative" 
      }}
    >
      {/* Background Spider */}
      <path 
        className="background" 
        d="M150,150 L150,30 M150,150 L270,150 M150,150 L150,270 M150,150 L30,150 M150,150 L210,70 M150,150 L210,230 M150,150 L90,230 M150,150 L90,70"
        style={{ 
          fill: "none", 
          stroke: "#E2E8F0",
          strokeWidth: 1 
        }}
      />
      <circle 
        className="background" 
        cx="150" 
        cy="150" 
        r="40"
        style={{ 
          fill: "none", 
          stroke: "#E2E8F0",
          strokeWidth: 1 
        }}
      />
      <circle 
        className="background" 
        cx="150" 
        cy="150" 
        r="80"
        style={{ 
          fill: "none", 
          stroke: "#E2E8F0",
          strokeWidth: 1 
        }}
      />
      <circle 
        className="background" 
        cx="150" 
        cy="150" 
        r="120"
        style={{ 
          fill: "none", 
          stroke: "#E2E8F0",
          strokeWidth: 1 
        }}
      />
      
      {/* Data Spider */}
      <path 
        className="data" 
        d={`M150,${150-(120*(orgScore-1)/2)} L${150+(120*(sysScore-1)/2)},150 L150,${150+(120*(processScore-1)/2)} L${150-(120*(peopleScore-1)/2)},150 Z`} 
        style={{ 
          fill: "rgba(72, 187, 120, 0.2)",
          stroke: "#48BB78",
          strokeWidth: 2 
        }}
      />
      
      {/* Labels */}
      <text 
        className="label" 
        x="150" 
        y="20" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "12px",
          fill: "#4A5568" 
        }}
      >
        Organisatie &amp; Management
      </text>
      <text 
        className="label" 
        x="280" 
        y="150" 
        textAnchor="start"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "12px",
          fill: "#4A5568" 
        }}
      >
        Systemen &amp; Faciliteiten
      </text>
      <text 
        className="label" 
        x="150" 
        y="280" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "12px",
          fill: "#4A5568" 
        }}
      >
        Processen &amp; Informatie
      </text>
      <text 
        className="label" 
        x="20" 
        y="150" 
        textAnchor="end"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "12px",
          fill: "#4A5568" 
        }}
      >
        Mensen &amp; Cultuur
      </text>
    </svg>
  );
}
