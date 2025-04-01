import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom styles to match the design requirements
document.documentElement.style.setProperty('--background', '#F7FAFC');
document.documentElement.style.setProperty('--foreground', '#2D3748');
document.documentElement.style.setProperty('--primary', '#2C5282');
document.documentElement.style.setProperty('--primary-foreground', '#FFFFFF');
document.documentElement.style.setProperty('--secondary', '#48BB78');
document.documentElement.style.setProperty('--secondary-foreground', '#FFFFFF');
document.documentElement.style.setProperty('--accent', '#9F7AEA');
document.documentElement.style.setProperty('--accent-foreground', '#FFFFFF');
document.documentElement.style.setProperty('--muted', '#EDF2F7');
document.documentElement.style.setProperty('--muted-foreground', '#4A5568');
document.documentElement.style.setProperty('--card', '#FFFFFF');
document.documentElement.style.setProperty('--card-foreground', '#2D3748');
document.documentElement.style.setProperty('--popover', '#FFFFFF');
document.documentElement.style.setProperty('--popover-foreground', '#2D3748');
document.documentElement.style.setProperty('--border', '#E2E8F0');
document.documentElement.style.setProperty('--input', '#E2E8F0');

createRoot(document.getElementById("root")!).render(<App />);
