// Beslisboom voor Haags Werken Elevator Maturity Assessment
// Deze structuur kan worden gebruikt om natuurlijke gespreksvragen te leiden
// zonder een robotische checklist-aanpak

const decisionTree = {
  // Startpunt van de beslisboom - inleidende vragen om het gesprek te beginnen
  startNode: {
    id: "start",
    question: "Welkom bij het assessment gesprek. Laten we eerst even kennismaken en het doel van dit gesprek bespreken. Kun je kort vertellen hoe jullie team is samengesteld en wat jullie voornaamste werkzaamheden zijn?",
    type: "intro",
    nextNode: "intro_context" // Ga naar introductie context node
  },
  
  // Nodes voor het vaststellen van context
  nodes: {
    // Introducerende vragen
    "intro_context": {
      id: "intro_context",
      question: "Dank voor deze introductie. Dit assessment helpt ons om te begrijpen waar jullie staan met de implementatie van de Haags Werken principes. Het is geen beoordeling maar een tool om jullie groei te ondersteunen. Hoe is jullie ervaring tot nu toe met deze inrichtingsprincipes?",
      type: "intro",
      options: [
        { value: "positive", label: "Overwegend positief", nextNode: "intro_expectations" },
        { value: "mixed", label: "Gemengd", nextNode: "intro_expectations" },
        { value: "negative", label: "Overwegend negatief", nextNode: "intro_expectations" },
        { value: "unfamiliar", label: "Niet bekend met de principes", nextNode: "intro_explanation" }
      ]
    },
    "intro_explanation": {
      id: "intro_explanation",
      question: "De Haags Werken principes zijn opgesteld om teams te helpen effectiever samen te werken, met meer focus op waarde en verbeterde samenwerking. Ze zijn opgebouwd rond vier perspectieven en drie niveaus van volwassenheid. Zullen we even door de basisprincipes lopen voordat we verder gaan?",
      type: "intro",
      nextNode: "intro_expectations"
    },
    "intro_expectations": {
      id: "intro_expectations",
      question: "Tijdens dit gesprek gaan we de vier perspectieven van Haags Werken bespreken: Organisatie & Management, Systemen & Faciliteiten, Mensen & Cultuur, en Processen & Informatie. Het doel is om vast te stellen waar jullie staan en wat de volgende stappen kunnen zijn. Zijn er bepaalde gebieden waar jullie team specifiek aan wil werken?",
      type: "intro",
      nextNode: "perspective_choice"
    },
    
    // Keuze van startperspectief - laat de coach beslissen waar te beginnen
    "perspective_choice": {
      id: "perspective_choice",
      question: "Op basis van wat je net hebt verteld, waar zouden jullie willen beginnen? Met welk perspectief?",
      type: "perspective_selector",
      options: [
        { value: "organization", label: "Organisatie & Management", nextNode: "organization_start" },
        { value: "systems", label: "Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "people", label: "Mensen & Cultuur", nextNode: "people_start" },
        { value: "processes", label: "Processen & Informatie", nextNode: "processes_start" }
      ]
    },
    
    //
    // ORGANISATIE & MANAGEMENT PERSPECTIEF
    //
    "organization_start": {
      id: "organization_start",
      question: "Laten we beginnen met Organisatie & Management. Dit gaat over hoe jullie team is georganiseerd, de rollen binnen het team en hoe besluiten worden genomen. Hoe zou je de huidige rolverdeling binnen jullie team omschrijven?",
      type: "conversation",
      perspectiveId: "organization",
      nextNode: "organization_roles_scrum"
    },
    "organization_roles_scrum": {
      id: "organization_roles_scrum",
      question: "Hebben jullie specifieke rollen gedefinieerd zoals een Product Owner of Scrum Master? Hoe zijn deze rollen ingevuld?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "reactive",
      levelId: "organization",
      questionIds: ["org_mgmt_1_org_1", "org_mgmt_1_org_2"],
      decisionLogic: (answers) => {
        // Als beide vragen positief zijn beantwoord, dan naar proactief niveau
        if (answers.every(a => a === "yes")) {
          return "organization_po_mandate";
        }
        // Als minstens één vraag deels is beantwoord, blijf op hetzelfde niveau
        else if (answers.some(a => a === "partly")) {
          return "organization_management_support";
        }
        // Als alle antwoorden negatief zijn, blijf op basisniveau
        else {
          return "organization_management_support";
        }
      }
    },
    "organization_po_mandate": {
      id: "organization_po_mandate",
      question: "Je gaf aan dat jullie een Product Owner hebben. Hoeveel mandaat heeft de PO om beslissingen te nemen over prioriteiten en requirements?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "proactive",
      levelId: "organization",
      questionIds: ["org_mgmt_2_org_1"],
      nextNode: "organization_strategy"
    },
    "organization_strategy": {
      id: "organization_strategy",
      question: "In hoeverre heeft jullie team een duidelijke strategie die is afgestemd op de organisatiedoelen van de gemeente?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "proactive",
      levelId: "organization",
      questionIds: ["org_mgmt_2_org_2"],
      nextNode: "organization_management_support"
    },
    "organization_management_support": {
      id: "organization_management_support",
      question: "Welke ondersteuning krijgen jullie vanuit het management voor het implementeren van de Haags Werken principes?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "reactive",
      levelId: "organization",
      questionIds: ["org_mgmt_1_org_3"],
      nextNode: "organization_team_cadence"
    },
    "organization_team_cadence": {
      id: "organization_team_cadence",
      question: "Hoe zou je de werkwijze van jullie team omschrijven? Werken jullie volgens een vaste cadans of structuur?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "reactive", 
      levelId: "team",
      questionIds: ["org_mgmt_1_team_1"],
      nextNode: "organization_team_agreements"
    },
    "organization_team_agreements": {
      id: "organization_team_agreements",
      question: "Hebben jullie vastgelegde teamafspraken over rollen en verantwoordelijkheden? Hoe zijn deze tot stand gekomen?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "reactive",
      levelId: "team",
      questionIds: ["org_mgmt_1_team_2"],
      nextNode: "organization_self_organization"
    },
    "organization_self_organization": {
      id: "organization_self_organization",
      question: "In hoeverre is jullie team zelforganiserend? Kunnen jullie beslissingen nemen zonder telkens goedkeuring van anderen nodig te hebben?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "proactive",
      levelId: "team",
      questionIds: ["org_mgmt_2_team_1"],
      nextNode: "organization_individual_understanding"
    },
    "organization_individual_understanding": {
      id: "organization_individual_understanding",
      question: "Begrijpen alle teamleden de basisprincipes van Haags Werken en hun rol binnen het team?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "reactive",
      levelId: "individual",
      questionIds: ["org_mgmt_1_ind_1"],
      nextNode: "organization_innovation"
    },
    "organization_innovation": {
      id: "organization_innovation",
      question: "Is er ruimte voor experimenteren en innoveren binnen jullie team? Hoe wordt dit gefaciliteerd?",
      type: "assessment",
      perspectiveId: "organization",
      plateauId: "innovative",
      levelId: "organization",
      questionIds: ["org_mgmt_3_org_1"],
      nextNode: "organization_conclusion"
    },
    "organization_conclusion": {
      id: "organization_conclusion",
      question: "We hebben nu een aantal aspecten van Organisatie & Management besproken. Wil je nog iets toevoegen over hoe jullie team is georganiseerd of hoe beslissingen worden genomen voordat we verder gaan?",
      type: "conclusion",
      perspectiveId: "organization",
      options: [
        { value: "systems", label: "Verder naar Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "people", label: "Verder naar Mensen & Cultuur", nextNode: "people_start" },
        { value: "processes", label: "Verder naar Processen & Informatie", nextNode: "processes_start" },
        { value: "more_organization", label: "Nog meer over Organisatie & Management", nextNode: "organization_more" }
      ]
    },
    "organization_more": {
      id: "organization_more",
      question: "Wat zou je nog meer willen bespreken over de organisatie en het management van jullie team?",
      type: "open",
      perspectiveId: "organization",
      options: [
        { value: "systems", label: "Nu verder naar Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "people", label: "Nu verder naar Mensen & Cultuur", nextNode: "people_start" },
        { value: "processes", label: "Nu verder naar Processen & Informatie", nextNode: "processes_start" }
      ]
    },
    
    //
    // SYSTEMEN & FACILITEITEN PERSPECTIEF
    //
    "systems_start": {
      id: "systems_start",
      question: "Laten we het hebben over Systemen & Faciliteiten. Dit gaat over de tools, technologieën en werkruimtes die jullie team gebruikt. Welke systemen en tools gebruiken jullie in het dagelijks werk?",
      type: "conversation",
      perspectiveId: "systems",
      nextNode: "systems_jira"
    },
    "systems_jira": {
      id: "systems_jira",
      question: "Gebruiken jullie Jira of een vergelijkbaar systeem voor het beheren van taken en de backlog?",
      type: "assessment",
      perspectiveId: "systems",
      plateauId: "reactive",
      levelId: "organization",
      questionIds: ["sys_fac_1_org_1"],
      nextNode: "systems_collaboration_spaces"
    },
    "systems_collaboration_spaces": {
      id: "systems_collaboration_spaces",
      question: "Hebben jullie geschikte ruimtes om samen te werken, zowel fysiek als digitaal?",
      type: "assessment",
      perspectiveId: "systems",
      plateauId: "reactive",
      levelId: "organization",
      questionIds: ["sys_fac_1_org_2"],
      nextNode: "systems_task_management"
    },
    "systems_task_management": {
      id: "systems_task_management",
      question: "Hoe gebruiken jullie deze tools voor het dagelijks taakbeheer? Kun je een voorbeeld geven?",
      type: "assessment",
      perspectiveId: "systems",
      plateauId: "reactive",
      levelId: "team",
      questionIds: ["sys_fac_1_team_1"],
      nextNode: "systems_information_sharing"
    },
    "systems_information_sharing": {
      id: "systems_information_sharing",
      question: "Hoe delen jullie informatie binnen het team? Gebruiken jullie SharePoint, MS Teams of andere platforms?",
      type: "assessment",
      perspectiveId: "systems",
      plateauId: "reactive",
      levelId: "team",
      questionIds: ["sys_fac_1_team_2"],
      nextNode: "systems_cicd"
    },
    "systems_cicd": {
      id: "systems_cicd",
      question: "Maken jullie gebruik van CI/CD pipelines of andere geautomatiseerde processen voor softwareontwikkeling?",
      type: "assessment",
      perspectiveId: "systems",
      plateauId: "proactive",
      levelId: "organization",
      questionIds: ["sys_fac_2_org_1"],
      nextNode: "systems_automated_testing"
    },
    "systems_automated_testing": {
      id: "systems_automated_testing",
      question: "In hoeverre gebruiken jullie geautomatiseerde tests en kwaliteitscontroles?",
      type: "assessment",
      perspectiveId: "systems",
      plateauId: "proactive",
      levelId: "team",
      questionIds: ["sys_fac_2_team_1"],
      nextNode: "systems_experimentation"
    },
    "systems_experimentation": {
      id: "systems_experimentation",
      question: "Experimenteert jullie team met nieuwe technologieën en methodieken om de productiviteit en kwaliteit te verbeteren?",
      type: "assessment",
      perspectiveId: "systems",
      plateauId: "innovative",
      levelId: "team",
      questionIds: ["sys_fac_3_team_1"],
      nextNode: "systems_conclusion"
    },
    "systems_conclusion": {
      id: "systems_conclusion",
      question: "We hebben nu een aantal aspecten van Systemen & Faciliteiten besproken. Zijn er nog andere tools of technologieën die jullie gebruiken of willen implementeren?",
      type: "conclusion",
      perspectiveId: "systems",
      options: [
        { value: "organization", label: "Terug naar Organisatie & Management", nextNode: "organization_start" },
        { value: "people", label: "Verder naar Mensen & Cultuur", nextNode: "people_start" },
        { value: "processes", label: "Verder naar Processen & Informatie", nextNode: "processes_start" },
        { value: "more_systems", label: "Nog meer over Systemen & Faciliteiten", nextNode: "systems_more" }
      ]
    },
    "systems_more": {
      id: "systems_more",
      question: "Wat zou je nog meer willen bespreken over de systemen en faciliteiten van jullie team?",
      type: "open",
      perspectiveId: "systems",
      options: [
        { value: "organization", label: "Terug naar Organisatie & Management", nextNode: "organization_start" },
        { value: "people", label: "Nu verder naar Mensen & Cultuur", nextNode: "people_start" },
        { value: "processes", label: "Nu verder naar Processen & Informatie", nextNode: "processes_start" }
      ]
    },
    
    //
    // MENSEN & CULTUUR PERSPECTIEF
    //
    "people_start": {
      id: "people_start",
      question: "Laten we het hebben over Mensen & Cultuur. Dit gaat over teamdynamiek, samenwerking, en hoe jullie als team met elkaar omgaan. Hoe zou je de cultuur binnen jullie team omschrijven?",
      type: "conversation",
      perspectiveId: "people",
      nextNode: "people_training"
    },
    "people_training": {
      id: "people_training",
      question: "Zijn er trainingen beschikbaar om het team vertrouwd te maken met het Haags Werken?",
      type: "assessment",
      perspectiveId: "people",
      plateauId: "reactive",
      levelId: "organization",
      questionIds: ["ppl_cul_1_org_1"],
      nextNode: "people_retrospectives"
    },
    "people_retrospectives": {
      id: "people_retrospectives",
      question: "Voeren jullie regelmatig retrospectives uit? Wat gebeurt er met de feedback die daaruit komt?",
      type: "assessment",
      perspectiveId: "people",
      plateauId: "reactive",
      levelId: "team",
      questionIds: ["ppl_cul_1_team_1"],
      nextNode: "people_transparency"
    },
    "people_transparency": {
      id: "people_transparency",
      question: "In hoeverre werkt jullie team volgens de inrichtingsprincipes en is er transparantie over wat er gebeurt?",
      type: "assessment",
      perspectiveId: "people",
      plateauId: "reactive",
      levelId: "team",
      questionIds: ["ppl_cul_1_team_2"],
      nextNode: "people_learning"
    },
    "people_learning": {
      id: "people_learning",
      question: "Hoe ziet kennisdeling en continu leren eruit binnen jullie team?",
      type: "assessment",
      perspectiveId: "people",
      plateauId: "proactive",
      levelId: "team",
      questionIds: ["ppl_cul_2_team_1"],
      nextNode: "people_adaptability"
    },
    "people_adaptability": {
      id: "people_adaptability",
      question: "Hoe gaat jullie team om met verandering en onverwachte situaties? Kun je een voorbeeld geven?",
      type: "assessment",
      perspectiveId: "people",
      plateauId: "innovative",
      levelId: "team",
      questionIds: ["ppl_cul_3_team_1"],
      nextNode: "people_conclusion"
    },
    "people_conclusion": {
      id: "people_conclusion",
      question: "We hebben nu verschillende aspecten van Mensen & Cultuur besproken. Is er nog iets wat je wilt toevoegen over hoe jullie team samenwerkt?",
      type: "conclusion",
      perspectiveId: "people",
      options: [
        { value: "organization", label: "Terug naar Organisatie & Management", nextNode: "organization_start" },
        { value: "systems", label: "Terug naar Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "processes", label: "Verder naar Processen & Informatie", nextNode: "processes_start" },
        { value: "more_people", label: "Nog meer over Mensen & Cultuur", nextNode: "people_more" }
      ]
    },
    "people_more": {
      id: "people_more",
      question: "Wat zou je nog meer willen bespreken over de mensen en cultuur binnen jullie team?",
      type: "open",
      perspectiveId: "people",
      options: [
        { value: "organization", label: "Terug naar Organisatie & Management", nextNode: "organization_start" },
        { value: "systems", label: "Terug naar Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "processes", label: "Nu verder naar Processen & Informatie", nextNode: "processes_start" }
      ]
    },
    
    //
    // PROCESSEN & INFORMATIE PERSPECTIEF
    //
    "processes_start": {
      id: "processes_start",
      question: "Laten we het hebben over Processen & Informatie. Dit gaat over jullie werkprocessen, datastromen en hoe jullie projecten en taken beheren. Hoe zou je jullie belangrijkste werkprocessen omschrijven?",
      type: "conversation",
      perspectiveId: "processes",
      nextNode: "processes_facilitation"
    },
    "processes_facilitation": {
      id: "processes_facilitation",
      question: "In hoeverre worden jullie als team gefaciliteerd om deel te nemen aan het voortbrengingsproces?",
      type: "assessment",
      perspectiveId: "processes",
      plateauId: "reactive",
      levelId: "organization",
      questionIds: ["proc_inf_1_org_1"],
      nextNode: "processes_workprocess"
    },
    "processes_workprocess": {
      id: "processes_workprocess",
      question: "Werken jullie volgens een specifiek proces zoals Scrum of Kanban?",
      type: "assessment",
      perspectiveId: "processes",
      plateauId: "reactive",
      levelId: "team",
      questionIds: ["proc_inf_1_team_1"],
      nextNode: "processes_definitions"
    },
    "processes_definitions": {
      id: "processes_definitions",
      question: "Hebben jullie een Definition of Done en een Definition of Ready voor jullie backlog items?",
      type: "assessment",
      perspectiveId: "processes",
      plateauId: "reactive",
      levelId: "team",
      questionIds: ["proc_inf_1_team_2"],
      nextNode: "processes_backlog"
    },
    "processes_backlog": {
      id: "processes_backlog",
      question: "Hoe beheren jullie de backlog? Is er een duidelijke structuur en prioritering?",
      type: "assessment",
      perspectiveId: "processes",
      plateauId: "proactive",
      levelId: "team",
      questionIds: ["proc_inf_2_team_1"],
      nextNode: "processes_metrics"
    },
    "processes_metrics": {
      id: "processes_metrics",
      question: "Gebruiken jullie geavanceerde metrieken en data-analyse om je prestaties te meten en te verbeteren?",
      type: "assessment",
      perspectiveId: "processes",
      plateauId: "innovative",
      levelId: "team",
      questionIds: ["proc_inf_3_team_1"],
      nextNode: "processes_conclusion"
    },
    "processes_conclusion": {
      id: "processes_conclusion",
      question: "We hebben nu verschillende aspecten van Processen & Informatie besproken. Wil je nog iets toevoegen over hoe jullie projecten en taken beheren?",
      type: "conclusion",
      perspectiveId: "processes",
      options: [
        { value: "organization", label: "Terug naar Organisatie & Management", nextNode: "organization_start" },
        { value: "systems", label: "Terug naar Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "people", label: "Terug naar Mensen & Cultuur", nextNode: "people_start" },
        { value: "more_processes", label: "Nog meer over Processen & Informatie", nextNode: "processes_more" },
        { value: "assessment_conclusion", label: "Afronden van het assessment", nextNode: "assessment_conclusion" }
      ]
    },
    "processes_more": {
      id: "processes_more",
      question: "Wat zou je nog meer willen bespreken over de processen en informatie binnen jullie team?",
      type: "open",
      perspectiveId: "processes",
      options: [
        { value: "organization", label: "Terug naar Organisatie & Management", nextNode: "organization_start" },
        { value: "systems", label: "Terug naar Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "people", label: "Terug naar Mensen & Cultuur", nextNode: "people_start" },
        { value: "assessment_conclusion", label: "Afronden van het assessment", nextNode: "assessment_conclusion" }
      ]
    },
    
    //
    // ASSESSMENT AFRONDING
    //
    "assessment_conclusion": {
      id: "assessment_conclusion",
      question: "We hebben nu alle perspectieven van het Haags Werken framework besproken. Bedankt voor je eerlijke antwoorden en openheid. Met deze informatie kunnen we een goed beeld krijgen van waar jullie team staat en welke stappen jullie kunnen nemen om verder te groeien. Is er nog iets anders wat je wilt bespreken of toevoegen voordat we het assessment afronden?",
      type: "conclusion",
      options: [
        { value: "finish", label: "Assessment afronden en resultaten bekijken", nextNode: "finish" },
        { value: "organization", label: "Terug naar Organisatie & Management", nextNode: "organization_start" },
        { value: "systems", label: "Terug naar Systemen & Faciliteiten", nextNode: "systems_start" },
        { value: "people", label: "Terug naar Mensen & Cultuur", nextNode: "people_start" },
        { value: "processes", label: "Terug naar Processen & Informatie", nextNode: "processes_start" }
      ]
    },
    "finish": {
      id: "finish",
      question: "Bedankt voor je deelname aan dit assessment. Klik op 'Afronden' om het volledige rapport en de aanbevelingen te bekijken.",
      type: "finish"
    }
  }
};

// Hulpfunctie om de juiste vervolgvraag te bepalen op basis van antwoorden
function determineNextQuestion(currentNodeId, answers) {
  const currentNode = decisionTree.nodes[currentNodeId];
  
  // Als er geen decisionLogic is, gebruik de standaard nextNode
  if (!currentNode.decisionLogic) {
    return currentNode.nextNode;
  }
  
  // Anders gebruik de decisionLogic functie
  return currentNode.decisionLogic(answers);
}

export default decisionTree;
