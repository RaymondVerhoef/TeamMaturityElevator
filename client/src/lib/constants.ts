// Perspectives
export type Perspective = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const PERSPECTIVES: Record<string, Perspective> = {
  organization: {
    id: "organization",
    name: "Organisatie & Management",
    description: "Dit perspectief richt zich op de rollen en verantwoordelijkheden van Product Owner (PO), Scrum Master (SM), en management binnen MDT's. Het bevordert samenwerking, dienend leiderschap, en governance die Haags werken ondersteunt.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  },
  systems: {
    id: "systems",
    name: "Systemen & Faciliteiten",
    description: "Dit perspectief richt zich op de technische infrastructuur en tools die MDT's ondersteunen bij hun werk.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
  },
  people: {
    id: "people",
    name: "Mensen & Cultuur",
    description: "Dit perspectief richt zich op teamdynamiek, psychologische veiligheid, en een cultuur van leren en verbeteren.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
  },
  processes: {
    id: "processes",
    name: "Processen & Informatie",
    description: "Dit perspectief richt zich op werkprocessen, datastromen, en de efficiëntie van processen. In deze dimensie is ook de borging van de ITIL-processen opgenomen.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  }
};

// Plateaus
export type Plateau = {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  description: string;
};

export const PLATEAUS: Record<string, Plateau> = {
  reactive: {
    id: "reactive",
    name: "Plateau 1: Reactief",
    level: 1,
    description: "Teams leggen een solide basis voor samenwerking en werkwijzen voor Haags Werken."
  },
  proactive: {
    id: "proactive",
    name: "Plateau 2: Pro actief",
    level: 2,
    description: "De organisatie en teams anticiperen op veranderingen, werken met gestructureerde processen en zetten in op continue verbetering."
  },
  innovative: {
    id: "innovative",
    name: "Plateau 3: Innovatief",
    level: 3,
    description: "De organisatie en teams zijn wendbaar en innovatief, gericht op waarde creatie en aanpassingsvermogen aan een dynamische omgeving."
  }
};

// Levels
export type Level = {
  id: string;
  name: string;
  description: string;
};

export const LEVELS: Record<string, Level> = {
  organization: {
    id: "organization",
    name: "Organisatieniveau",
    description: "Rollen, mandaten en governance binnen de bredere organisatie"
  },
  team: {
    id: "team",
    name: "Teamniveau",
    description: "Samenwerking, werkafspraken en verdeling van verantwoordelijkheden"
  },
  individual: {
    id: "individual",
    name: "Individueel niveau",
    description: "Persoonlijke verantwoordelijkheden en bijdragen aan het team"
  }
};

// Questions data
export type Question = {
  id: string;
  text: string;
  description: string;
  perspectiveId: string;
  plateauId: string;
  levelId: string;
};

export const QUESTIONS: Question[] = [
  // Organizational Management - Reactive - Organization Level
  {
    id: "org_mgmt_1_org_1",
    text: "Is de Product Owner rol duidelijk gedefinieerd en toegewezen?",
    description: "Idealiter heeft het team één PO (min. 0,5 FTE) met een duidelijk mandaat van de Business Owner.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "org_mgmt_1_org_2",
    text: "Is de Scrum Master rol duidelijk gedefinieerd en toegewezen?",
    description: "Idealiter heeft het team één SM (min. 0,3 FTE) met kennis van agile werkwijzen.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "org_mgmt_1_org_3",
    text: "Zorgt het management voor duidelijke kaders en richtlijnen?",
    description: "Effectief bestuur zorgt voor duidelijke kaders en fundamentele richtlijnen, waardoor teams gestructureerd en doelgericht kunnen functioneren.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "organization"
  },
  
  // Organizational Management - Reactive - Team Level
  {
    id: "org_mgmt_1_team_1",
    text: "Werkt het team volgens een vaste cadans?",
    description: "Teams werken idealiter volgens een vaste cadans die aansluit bij het voortbrengingsproces en is afgestemd met de organisatie.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "org_mgmt_1_team_2",
    text: "Zijn er vastgelegde afspraken over rollen en verantwoordelijkheden?",
    description: "Er zijn idealiter vastgelegde afspraken binnen het team over rollen, samenwerking, en verantwoordelijkheden.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "team"
  },
  
  // Organizational Management - Reactive - Individual Level
  {
    id: "org_mgmt_1_ind_1",
    text: "Begrijpen teamleden de basisprincipes van Haags werken?",
    description: "Teamleden begrijpen de basisprincipes van Haags werken en hun eigen rol binnen het team.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "individual"
  },
  
  // Organizational Management - Proactive - Organization Level
  {
    id: "org_mgmt_2_org_1",
    text: "Heeft de Product Owner mandaat en is hij/zij in staat om prioriteiten te stellen?",
    description: "De PO kan volledig prioriteiten stellen en heeft mandaat om beslissingen te nemen over requirements en prioriteiten.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "org_mgmt_2_org_2",
    text: "Heeft het team een duidelijke strategie die is afgestemd op de organisatiedoelen?",
    description: "Het team heeft een duidelijke strategie vastgesteld die is afgestemd op organisatiedoelen, missie, en waarden.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "organization"
  },
  
  // Organizational Management - Proactive - Team Level
  {
    id: "org_mgmt_2_team_1",
    text: "Is het team zelforganiserend en in staat beslissingen te nemen?",
    description: "Het team is zelforganiserend, in staat om eigen beslissingen te nemen, en verantwoordelijk voor het resultaat.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "team"
  },
  
  // Organizational Management - Innovative - Organization Level
  {
    id: "org_mgmt_3_org_1",
    text: "Is er een cultuur van experimenteren en innoveren binnen de organisatie?",
    description: "De organisatie stimuleert actief experimenteren en innoveren, en biedt ruimte voor het testen van nieuwe ideeën.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "organization"
  },
  
  // Systems & Facilities - Reactive - Organization Level
  {
    id: "sys_fac_1_org_1",
    text: "Is Jira beschikbaar gesteld door de organisatie en wordt het actief gebruikt?",
    description: "Jira is beschikbaar gesteld door de organisatie en wordt actief gebruikt voor taakbeheer.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "sys_fac_1_org_2",
    text: "Zijn er geschikte samenwerkingsruimtes beschikbaar?",
    description: "Samenwerkingsruimtes (fysiek of digitaal) zijn ingericht voor teamgebruik.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "organization"
  },
  
  // Systems & Facilities - Reactive - Team Level
  {
    id: "sys_fac_1_team_1",
    text: "Gebruikt het team eenvoudige hulpmiddelen voor taakbeheer?",
    description: "Teams gebruiken eenvoudige hulpmiddelen zoals een digitale backlog voor taakbeheer.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "sys_fac_1_team_2",
    text: "Wordt informatie gedeeld via gemeenschappelijke platforms?",
    description: "Gegevens worden gedeeld via SharePoint site, gedeelde documenten en MS Teams.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "team"
  },
  
  // Systems & Facilities - Proactive - Organization Level
  {
    id: "sys_fac_2_org_1",
    text: "Wordt CI/CD actief gebruikt voor softwareontwikkeling?",
    description: "CI/CD pipelines zijn ingericht en worden actief gebruikt voor softwareontwikkeling en deployment.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "organization"
  },
  
  // Systems & Facilities - Proactive - Team Level
  {
    id: "sys_fac_2_team_1",
    text: "Maakt het team gebruik van geautomatiseerde tests en kwaliteitscontroles?",
    description: "Het team maakt gebruik van geautomatiseerde tests en kwaliteitscontroles om de kwaliteit van de software te waarborgen.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "team"
  },
  
  // Systems & Facilities - Innovative - Team Level
  {
    id: "sys_fac_3_team_1",
    text: "Experimenteert het team met nieuwe technologieën en methodieken?",
    description: "Het team experimenteert actief met nieuwe technologieën en methodieken om de productiviteit en kwaliteit te verbeteren.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "team"
  },
  
  // People & Culture - Reactive - Organization Level
  {
    id: "ppl_cul_1_org_1",
    text: "Zijn er basistrainingen beschikbaar over het Haagse werken?",
    description: "Er zijn basistrainingen beschikbaar om teams kennis te laten maken met het Haagse werken.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "organization"
  },
  
  // People & Culture - Reactive - Team Level
  {
    id: "ppl_cul_1_team_1",
    text: "Worden retrospectives gebruikt als reflectiemiddel?",
    description: "Retrospectives worden geïntroduceerd als reflectiemiddel en leiden tot verbeteracties.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "ppl_cul_1_team_2",
    text: "Werkt het team binnen de inrichtingsprincipes en is het transparant?",
    description: "Teamleden werken binnen de inrichtingsprincipes en zijn transparant.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "team"
  },
  
  // People & Culture - Proactive - Team Level
  {
    id: "ppl_cul_2_team_1",
    text: "Is er een cultuur van continu leren en kennisdeling binnen het team?",
    description: "Het team heeft een cultuur van continu leren en actieve kennisdeling, zowel intern als met andere teams.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "team"
  },
  
  // People & Culture - Innovative - Team Level
  {
    id: "ppl_cul_3_team_1",
    text: "Is het team in staat om zichzelf aan te passen en te innoveren?",
    description: "Het team kan zichzelf aanpassen aan veranderende omstandigheden en zoekt actief naar innovatieve oplossingen.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "team"
  },
  
  // Process & Information - Reactive - Organization Level
  {
    id: "proc_inf_1_org_1",
    text: "Worden teams actief gefaciliteerd om deel te nemen in het voortbrengingsproces?",
    description: "Teams worden actief gefaciliteerd om deel te nemen in het voortbrengingsproces.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "organization"
  },
  
  // Process & Information - Reactive - Team Level
  {
    id: "proc_inf_1_team_1",
    text: "Werkt het team met een vastgesteld werkproces?",
    description: "Teams werken met een vastgesteld werkproces voor het plannen en uitvoeren van taken (Scrum, Kanban etc.).",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "proc_inf_1_team_2",
    text: "Zijn er definities van 'Done' en 'Ready' vastgesteld?",
    description: "Er is een eenvoudige Definition of Done en Definition of Ready vastgesteld voor alle backlogitems.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "team"
  },
  
  // Process & Information - Proactive - Team Level
  {
    id: "proc_inf_2_team_1",
    text: "Werkt het team met gestructureerde backlogs en prioritering?",
    description: "Het team werkt met gestructureerde backlogs, prioritering, en regelmatige refinement sessies.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "team"
  },
  
  // Process & Information - Innovative - Team Level
  {
    id: "proc_inf_3_team_1",
    text: "Gebruikt het team geavanceerde metrics en data-analyse?",
    description: "Het team gebruikt geavanceerde metrics en data-analyse om de prestaties te meten en te verbeteren.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "team"
  }
];

// Answer Options
export const ANSWER_OPTIONS = [
  { value: "yes", label: "Ja, volledig", score: 1.0 },
  { value: "partly", label: "Gedeeltelijk", score: 0.5 },
  { value: "no", label: "Nee", score: 0.0 }
];
