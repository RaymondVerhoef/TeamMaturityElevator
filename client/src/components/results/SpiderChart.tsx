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

    // We'll keep the original range of 1-3 for the scores,
    // but make the visualization clearer by expanding the visual scale
    
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    // Instead of normalizing to 0-1, we'll use more of the chart space
    // We'll map the 1-3 scale to a better visual scale (0.1-1.0)
    // This will show more distinction between values
    const scaleValue = (value: number) => 0.1 + ((value - 1) / 2) * 0.9;
    
    // Scaled scores
    const scaledOrgScore = scaleValue(orgScore);
    const scaledSysScore = scaleValue(sysScore);
    const scaledPeopleScore = scaleValue(peopleScore);
    const scaledProcessScore = scaleValue(processScore);
    
    // Calculate points for radar chart
    const topPoint = { 
      x: centerX, 
      y: centerY - (radius * scaledOrgScore) 
    };
    const rightPoint = { 
      x: centerX + (radius * scaledSysScore), 
      y: centerY 
    };
    const bottomPoint = { 
      x: centerX, 
      y: centerY + (radius * scaledProcessScore) 
    };
    const leftPoint = { 
      x: centerX - (radius * scaledPeopleScore), 
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
      {/* Background Grid */}
      <path 
        className="background" 
        d="M150,150 L150,30 M150,150 L270,150 M150,150 L150,270 M150,150 L30,150 M150,150 L210,70 M150,150 L210,230 M150,150 L90,230 M150,150 L90,70"
        style={{ 
          fill: "none", 
          stroke: "#E2E8F0",
          strokeWidth: 1 
        }}
      />
      
      {/* Plateau Circles - Reactive (Level 1) */}
      <circle 
        className="plateau-1"
        cx="150" 
        cy="150" 
        r="42"
        style={{ 
          fill: "rgba(226, 232, 240, 0.2)", 
          stroke: "#CBD5E0",
          strokeWidth: 1,
          strokeDasharray: "4 2"
        }}
      />
      
      {/* Plateau Circles - Proactive (Level 2) */}
      <circle 
        className="plateau-2"
        cx="150" 
        cy="150" 
        r="78"
        style={{ 
          fill: "rgba(226, 232, 240, 0.2)", 
          stroke: "#CBD5E0",
          strokeWidth: 1,
          strokeDasharray: "4 2"
        }}
      />
      
      {/* Plateau Circles - Innovative (Level 3) */}
      <circle 
        className="plateau-3"
        cx="150" 
        cy="150" 
        r="120"
        style={{ 
          fill: "rgba(226, 232, 240, 0.2)", 
          stroke: "#CBD5E0",
          strokeWidth: 1
        }}
      />
      
      {/* Data Spider */}
      <path 
        className="data" 
        d=""  /* This will be set by the useEffect hook */
        style={{ 
          fill: "rgba(72, 187, 120, 0.3)",
          stroke: "#48BB78",
          strokeWidth: 2.5 
        }}
      />
      
      {/* Data Points with Exact Values */}
      <circle 
        cx="150" 
        cy={150 - (120 * (0.1 + ((orgScore - 1) / 2) * 0.9))} 
        r="4"
        style={{ 
          fill: "#48BB78",
          stroke: "white",
          strokeWidth: 1.5
        }}
      />
      <circle 
        cx={150 + (120 * (0.1 + ((sysScore - 1) / 2) * 0.9))} 
        cy="150" 
        r="4"
        style={{ 
          fill: "#48BB78",
          stroke: "white",
          strokeWidth: 1.5
        }}
      />
      <circle 
        cx="150" 
        cy={150 + (120 * (0.1 + ((processScore - 1) / 2) * 0.9))} 
        r="4"
        style={{ 
          fill: "#48BB78",
          stroke: "white",
          strokeWidth: 1.5
        }}
      />
      <circle 
        cx={150 - (120 * (0.1 + ((peopleScore - 1) / 2) * 0.9))} 
        cy="150" 
        r="4"
        style={{ 
          fill: "#48BB78",
          stroke: "white",
          strokeWidth: 1.5
        }}
      />
      
      {/* Plateau Labels */}
      <text 
        x="150" 
        y="110" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "10px",
          fill: "#718096",
          fontWeight: "bold"
        }}
      >
        Reactief
      </text>
      <text 
        x="150" 
        y="75" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "10px",
          fill: "#718096",
          fontWeight: "bold"
        }}
      >
        Proactief
      </text>
      <text 
        x="150" 
        y="40" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "10px",
          fill: "#718096",
          fontWeight: "bold"
        }}
      >
        Innovatief
      </text>
      
      {/* Axis Labels */}
      <text 
        className="label" 
        x="150" 
        y="15" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "12px",
          fill: "#4A5568",
          fontWeight: "bold"
        }}
      >
        Organisatie &amp; Management
      </text>
      <text 
        className="label" 
        x="285" 
        y="150" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "12px",
          fill: "#4A5568",
          fontWeight: "bold"
        }}
      >
        Systemen &amp; Faciliteiten
      </text>
      <text 
        className="label" 
        x="150" 
        y="285" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "12px",
          fill: "#4A5568",
          fontWeight: "bold"
        }}
      >
        Processen &amp; Informatie
      </text>
      <text 
        className="label" 
        x="15" 
        y="150" 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "12px",
          fill: "#4A5568",
          fontWeight: "bold"
        }}
      >
        Mensen &amp; Cultuur
      </text>
      
      {/* Score Value Texts */}
      <text 
        x="150" 
        cy={150 - (120 * (0.1 + ((orgScore - 1) / 2) * 0.9))} 
        y={150 - (120 * (0.1 + ((orgScore - 1) / 2) * 0.9)) - 12} 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "11px",
          fill: "#48BB78",
          fontWeight: "bold"
        }}
      >
        {orgScore.toFixed(1)}
      </text>
      <text 
        x={150 + (120 * (0.1 + ((sysScore - 1) / 2) * 0.9)) + 15} 
        y="150" 
        textAnchor="start"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "11px",
          fill: "#48BB78",
          fontWeight: "bold"
        }}
      >
        {sysScore.toFixed(1)}
      </text>
      <text 
        x="150" 
        y={150 + (120 * (0.1 + ((processScore - 1) / 2) * 0.9)) + 15} 
        textAnchor="middle"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "11px",
          fill: "#48BB78",
          fontWeight: "bold"
        }}
      >
        {processScore.toFixed(1)}
      </text>
      <text 
        x={150 - (120 * (0.1 + ((peopleScore - 1) / 2) * 0.9)) - 15} 
        y="150" 
        textAnchor="end"
        style={{ 
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "11px",
          fill: "#48BB78",
          fontWeight: "bold"
        }}
      >
        {peopleScore.toFixed(1)}
      </text>
    </svg>
  );
}
