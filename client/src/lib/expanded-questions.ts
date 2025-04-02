import { Question } from "./constants";

// Comprehensive list of questions for the Haags Werken Elevator framework
export const EXPANDED_QUESTIONS: Question[] = [
  //===================================================================================
  // ORGANIZATION & MANAGEMENT - PLATEAU 1 (REACTIVE)
  //===================================================================================
  
  // Organization Level
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
  {
    id: "org_mgmt_1_org_4",
    text: "Zijn er duidelijke verantwoordingslijnen naar het management?",
    description: "Er zijn duidelijke en transparante verantwoordingslijnen naar het management, zodat teams weten aan wie ze rapporteren.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "org_mgmt_1_org_5",
    text: "Is er een transparante besluitvormingsstructuur?",
    description: "Er is een transparante besluitvormingsstructuur die duidelijk maakt hoe besluiten worden genomen op organisatieniveau.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "organization"
  },
  
  // Team Level
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
  {
    id: "org_mgmt_1_team_3",
    text: "Heeft het team een werkwijze voor het prioriteren van werk?",
    description: "Het team heeft een duidelijke werkwijze voor het prioriteren van taken en backlog items.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "org_mgmt_1_team_4",
    text: "Houdt het team regelmatig gezamenlijke sessies voor afstemming?",
    description: "Het team houdt regelmatig sessies voor onderlinge afstemming, zoals daily stand-ups, planning en review sessies.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "org_mgmt_1_ind_1",
    text: "Begrijpen teamleden de basisprincipes van Haags werken?",
    description: "Teamleden begrijpen de basisprincipes van Haags werken en hun eigen rol binnen het team.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "individual"
  },
  {
    id: "org_mgmt_1_ind_2",
    text: "Nemen teamleden verantwoordelijkheid voor hun toegewezen taken?",
    description: "Individuele teamleden nemen verantwoordelijkheid voor de aan hen toegewezen taken en leveren volgens afspraak.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "individual"
  },
  {
    id: "org_mgmt_1_ind_3",
    text: "Delen teamleden kennis en ervaringen met elkaar?",
    description: "Teamleden delen kennis, ervaringen en uitdagingen met elkaar om van elkaar te leren.",
    perspectiveId: "organization",
    plateauId: "reactive",
    levelId: "individual"
  },
  
  //===================================================================================
  // ORGANIZATION & MANAGEMENT - PLATEAU 2 (PROACTIVE)
  //===================================================================================
  
  // Organization Level
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
  {
    id: "org_mgmt_2_org_3",
    text: "Worden resources proactief toegewezen op basis van prioriteiten?",
    description: "Resources worden proactief toegewezen op basis van strategische prioriteiten en capaciteitsbehoefte.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "org_mgmt_2_org_4",
    text: "Faciliteert het management cross-functionele samenwerking tussen teams?",
    description: "Het management faciliteert en stimuleert cross-functionele samenwerking tussen verschillende teams en afdelingen.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "org_mgmt_2_org_5",
    text: "Is er een feedbackcultuur waar management en teams elkaar open feedback geven?",
    description: "Er is een gezonde feedbackcultuur waar management en teams elkaar respectvol en open feedback geven.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "organization"
  },
  
  // Team Level
  {
    id: "org_mgmt_2_team_1",
    text: "Is het team zelforganiserend en in staat beslissingen te nemen?",
    description: "Het team is zelforganiserend, in staat om eigen beslissingen te nemen, en verantwoordelijk voor het resultaat.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "org_mgmt_2_team_2",
    text: "Anticipeert het team proactief op uitdagingen en behoeften?",
    description: "Het team anticipeert proactief op uitdagingen, behoeften en veranderingen in plaats van er alleen op te reageren.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "org_mgmt_2_team_3",
    text: "Heeft het team een werkwijze voor capaciteitsplanning?",
    description: "Het team heeft een duidelijke werkwijze voor capaciteitsplanning en workload management.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "org_mgmt_2_team_4",
    text: "Evalueert het team regelmatig zijn eigen prestaties en verbeterpunten?",
    description: "Het team evalueert regelmatig zijn eigen prestaties en stelt concreet actieplannen op voor verbetering.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "org_mgmt_2_ind_1",
    text: "Nemen teamleden initiatief voor verbeteringen en innovatie?",
    description: "Individuele teamleden nemen initiatief voor verbeteringen en innovatie binnen het team.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "individual"
  },
  {
    id: "org_mgmt_2_ind_2",
    text: "Plannen teamleden proactief hun werk en ontwikkeling?",
    description: "Teamleden plannen proactief hun werk en persoonlijke ontwikkeling en communiceren hierover met het team.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "individual"
  },
  {
    id: "org_mgmt_2_ind_3",
    text: "Zoeken teamleden actief feedback op hun werk?",
    description: "Teamleden zoeken actief feedback op hun werk en gebruiken deze voor verbetering.",
    perspectiveId: "organization",
    plateauId: "proactive",
    levelId: "individual"
  },
  
  //===================================================================================
  // ORGANIZATION & MANAGEMENT - PLATEAU 3 (INNOVATIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "org_mgmt_3_org_1",
    text: "Is er een cultuur van experimenteren en innoveren binnen de organisatie?",
    description: "De organisatie stimuleert actief experimenteren en innoveren, en biedt ruimte voor het testen van nieuwe ideeën.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "org_mgmt_3_org_2",
    text: "Worden agile methodieken aangepast en verbeterd op basis van organisatiebehoeften?",
    description: "De organisatie past agile methodieken aan en verbetert deze continu op basis van specifieke organisatiebehoeften.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "org_mgmt_3_org_3",
    text: "Is er een organisatiebreed innovatieprogramma?",
    description: "Er is een organisatiebreed innovatieprogramma dat teams helpt met het ontwikkelen en implementeren van innovatieve ideeën.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "org_mgmt_3_org_4",
    text: "Stroomlijnt de organisatie processen op basis van data en feedback?",
    description: "De organisatie stroomlijnt processen op basis van data, feedback en geleerde lessen uit eerdere projecten.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "org_mgmt_3_org_5",
    text: "Is er een adaptief bestuursmodel dat snel op veranderingen kan inspelen?",
    description: "De organisatie heeft een adaptief bestuursmodel dat snel kan inspelen op veranderende markt- en organisatiebehoeften.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "organization"
  },
  
  // Team Level
  {
    id: "org_mgmt_3_team_1",
    text: "Experimenteert het team met nieuwe werkvormen en methodieken?",
    description: "Het team experimenteert met nieuwe werkvormen en methodieken om effectiviteit te vergroten.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "org_mgmt_3_team_2",
    text: "Heeft het team een innovatieve benadering van problemen en uitdagingen?",
    description: "Het team heeft een innovatieve, creatieve benadering van problemen en uitdagingen.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "org_mgmt_3_team_3",
    text: "Deelt het team kennis en innovaties met andere teams?",
    description: "Het team deelt proactief kennis, ervaringen en innovaties met andere teams in de organisatie.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "org_mgmt_3_team_4",
    text: "Heeft het team zelflerende mechanismen?",
    description: "Het team heeft zelflerende mechanismen die continue verbetering en innovatie stimuleren.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "org_mgmt_3_ind_1",
    text: "Dragen teamleden bij aan de innovatiecultuur?",
    description: "Teamleden dragen actief bij aan de innovatiecultuur door nieuwe ideeën en benaderingen voor te stellen.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "individual"
  },
  {
    id: "org_mgmt_3_ind_2",
    text: "Nemen teamleden eigenaarschap voor hun persoonlijke en professionele groei?",
    description: "Teamleden nemen volledig eigenaarschap voor hun persoonlijke en professionele groei.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "individual"
  },
  {
    id: "org_mgmt_3_ind_3",
    text: "Coachen teamleden elkaar en delen ze kennis binnen en buiten het team?",
    description: "Teamleden coachen elkaar en delen actief kennis binnen en buiten het team.",
    perspectiveId: "organization",
    plateauId: "innovative",
    levelId: "individual"
  },
  
  //===================================================================================
  // SYSTEMS & FACILITIES - PLATEAU 1 (REACTIVE)
  //===================================================================================
  
  // Organization Level
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
  {
    id: "sys_fac_1_org_3",
    text: "Zijn de benodigde tools en systemen voor ontwikkeling beschikbaar?",
    description: "De organisatie stelt de benodigde tools en systemen beschikbaar voor ontwikkeling, testen en deployment.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "sys_fac_1_org_4",
    text: "Is er een basisinfrastructuur voor versiebeheer en code repositories?",
    description: "Er is een basisinfrastructuur voor versiebeheer en code repositories (zoals Git/GitHub/GitLab).",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "sys_fac_1_org_5",
    text: "Zijn er basisfaciliteiten voor remote werken beschikbaar?",
    description: "Er zijn basisfaciliteiten beschikbaar voor remote werken (VPN, videoconferencing, etc.).",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "organization"
  },
  
  // Team Level
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
  {
    id: "sys_fac_1_team_3",
    text: "Heeft het team toegang tot en kennis van de benodigde ontwikkeltools?",
    description: "Het team heeft toegang tot en basiskennis van de benodigde ontwikkeltools en systemen.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "sys_fac_1_team_4",
    text: "Zijn er afspraken over informatiebeheer en documentatie?",
    description: "Het team heeft basisafspraken over informatiebeheer en documentatie.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "sys_fac_1_ind_1",
    text: "Kunnen teamleden efficiënt werken met de beschikbare tools?",
    description: "Teamleden kunnen efficiënt werken met de beschikbare tools en systemen.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "individual"
  },
  {
    id: "sys_fac_1_ind_2",
    text: "Delen teamleden kennis over het gebruik van tools met elkaar?",
    description: "Teamleden delen kennis over het gebruik van tools en systemen met elkaar.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "individual"
  },
  {
    id: "sys_fac_1_ind_3",
    text: "Documenteren teamleden hun werk op een begrijpelijke manier?",
    description: "Teamleden documenteren hun werk op een begrijpelijke manier voor andere teamleden.",
    perspectiveId: "systems",
    plateauId: "reactive",
    levelId: "individual"
  },
  
  //===================================================================================
  // SYSTEMS & FACILITIES - PLATEAU 2 (PROACTIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "sys_fac_2_org_1",
    text: "Wordt CI/CD actief gebruikt voor softwareontwikkeling?",
    description: "CI/CD pipelines zijn ingericht en worden actief gebruikt voor softwareontwikkeling en deployment.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "sys_fac_2_org_2",
    text: "Is er een gestandaardiseerde ontwikkel- en testomgeving?",
    description: "Er is een gestandaardiseerde ontwikkel- en testomgeving die teams kunnen gebruiken.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "sys_fac_2_org_3",
    text: "Wordt de infrastructuur proactief gemonitord en beheerd?",
    description: "De infrastructuur wordt proactief gemonitord en beheerd om problemen te voorkomen.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "sys_fac_2_org_4",
    text: "Is er een gestructureerd proces voor het beheren van toegangsrechten?",
    description: "Er is een gestructureerd proces voor het beheren van toegangsrechten tot systemen en data.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "sys_fac_2_org_5",
    text: "Zijn er faciliteiten voor het meten van systeemprestaties?",
    description: "Er zijn faciliteiten voor het meten en rapporteren van systeemprestaties en -gebruik.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "organization"
  },
  
  // Team Level
  {
    id: "sys_fac_2_team_1",
    text: "Maakt het team gebruik van geautomatiseerde tests en kwaliteitscontroles?",
    description: "Het team maakt gebruik van geautomatiseerde tests en kwaliteitscontroles om de kwaliteit van de software te waarborgen.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "sys_fac_2_team_2",
    text: "Gebruikt het team proactief monitoringtools voor hun systemen?",
    description: "Het team gebruikt proactief monitoringtools om de prestaties en stabiliteit van hun systemen te bewaken.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "sys_fac_2_team_3",
    text: "Anticipeert het team op capaciteitsbehoefte van systemen?",
    description: "Het team anticipeert op capaciteitsbehoefte van systemen en schaalt proactief op of af.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "sys_fac_2_team_4",
    text: "Heeft het team een strategie voor technische schuld?",
    description: "Het team heeft een strategie voor het beheren en verminderen van technische schuld.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "sys_fac_2_ind_1",
    text: "Evalueren teamleden proactief de effectiviteit van tools en processen?",
    description: "Teamleden evalueren proactief de effectiviteit van tools en processen en stellen verbeteringen voor.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "individual"
  },
  {
    id: "sys_fac_2_ind_2",
    text: "Houden teamleden hun technische kennis up-to-date?",
    description: "Teamleden houden hun technische kennis up-to-date en delen nieuwe inzichten met het team.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "individual"
  },
  {
    id: "sys_fac_2_ind_3",
    text: "Nemen teamleden verantwoordelijkheid voor de kwaliteit van hun code en systemen?",
    description: "Teamleden nemen verantwoordelijkheid voor de kwaliteit en onderhoudbaarheid van hun code en systemen.",
    perspectiveId: "systems",
    plateauId: "proactive",
    levelId: "individual"
  },
  
  //===================================================================================
  // SYSTEMS & FACILITIES - PLATEAU 3 (INNOVATIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "sys_fac_3_org_1",
    text: "Wordt er geïnvesteerd in innovatieve technologieën en tooling?",
    description: "De organisatie investeert in innovatieve technologieën en tooling om de productiviteit en kwaliteit te verbeteren.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "sys_fac_3_org_2",
    text: "Is er een platform voor het delen van innovatieve oplossingen tussen teams?",
    description: "Er is een platform voor het delen van innovatieve technische oplossingen tussen teams.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "sys_fac_3_org_3",
    text: "Wordt er geëxperimenteerd met nieuwe infrastructuur en architecturen?",
    description: "De organisatie experimenteert met nieuwe infrastructuur, architecturen en deployment-methoden.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "sys_fac_3_org_4",
    text: "Is er een strategie voor het adopteren van opkomende technologieën?",
    description: "Er is een strategie voor het evalueren en adopteren van opkomende technologieën.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "sys_fac_3_org_5",
    text: "Worden faciliteiten aangepast op basis van gebruikersfeedback?",
    description: "Faciliteiten worden continu aangepast en verbeterd op basis van gebruikersfeedback en veranderende behoeften.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "organization"
  },
  
  // Team Level
  {
    id: "sys_fac_3_team_1",
    text: "Experimenteert het team met nieuwe technologieën en methodieken?",
    description: "Het team experimenteert actief met nieuwe technologieën en methodieken om de productiviteit en kwaliteit te verbeteren.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "sys_fac_3_team_2",
    text: "Ontwikkelt het team eigen tools of extensies om workflows te verbeteren?",
    description: "Het team ontwikkelt eigen tools of extensies om workflows en processen te verbeteren.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "sys_fac_3_team_3",
    text: "Past het team continu de werkruimte aan de behoeften aan?",
    description: "Het team past continu de fysieke en digitale werkruimte aan op basis van veranderende behoeften.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "sys_fac_3_team_4",
    text: "Deelt het team innovatieve technische oplossingen met andere teams?",
    description: "Het team deelt innovatieve technische oplossingen en best practices actief met andere teams.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "sys_fac_3_ind_1",
    text: "Dragen teamleden bij aan innovatieve technische oplossingen?",
    description: "Teamleden dragen actief bij aan het ontwikkelen en implementeren van innovatieve technische oplossingen.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "individual"
  },
  {
    id: "sys_fac_3_ind_2",
    text: "Experimenteren teamleden met nieuwe technologieën en tools?",
    description: "Teamleden experimenteren met nieuwe technologieën en tools en delen hun bevindingen.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "individual"
  },
  {
    id: "sys_fac_3_ind_3",
    text: "Mentoren teamleden anderen in het gebruik van geavanceerde tools?",
    description: "Teamleden fungeren als mentoren voor anderen in het gebruik van geavanceerde tools en technologieën.",
    perspectiveId: "systems",
    plateauId: "innovative",
    levelId: "individual"
  },
  
  //===================================================================================
  // PEOPLE & CULTURE - PLATEAU 1 (REACTIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "ppl_cul_1_org_1",
    text: "Zijn er basistrainingen beschikbaar over het Haagse werken?",
    description: "Er zijn basistrainingen beschikbaar om teams kennis te laten maken met het Haagse werken.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "ppl_cul_1_org_2",
    text: "Stimuleert de organisatie teamontwikkeling?",
    description: "De organisatie stimuleert en faciliteert teamontwikkeling en samenwerking.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "ppl_cul_1_org_3",
    text: "Is er een open communicatiecultuur binnen de organisatie?",
    description: "Er is een open communicatiecultuur waarbij informatie transparant wordt gedeeld.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "ppl_cul_1_org_4",
    text: "Worden basisvoorwaarden geboden voor persoonlijke ontwikkeling?",
    description: "De organisatie biedt basisvoorwaarden voor persoonlijke en professionele ontwikkeling.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "ppl_cul_1_org_5",
    text: "Is er aandacht voor diversiteit en inclusie?",
    description: "Er is aandacht voor diversiteit en inclusie binnen de organisatie.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "organization"
  },
  
  // Team Level
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
  {
    id: "ppl_cul_1_team_3",
    text: "Is er een basis van onderling vertrouwen binnen het team?",
    description: "Er is een basis van onderling vertrouwen en respect binnen het team.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "ppl_cul_1_team_4",
    text: "Helpen teamleden elkaar bij het oplossen van problemen?",
    description: "Teamleden helpen elkaar bij het oplossen van problemen en uitdagingen.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "ppl_cul_1_team_5",
    text: "Wordt conflictoplossing constructief aangepakt?",
    description: "Conflicten worden op een constructieve manier aangepakt en opgelost.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "ppl_cul_1_ind_1",
    text: "Nemen teamleden verantwoordelijkheid voor hun eigen werk?",
    description: "Teamleden nemen verantwoordelijkheid voor hun eigen werk en bijdrage aan het team.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "individual"
  },
  {
    id: "ppl_cul_1_ind_2",
    text: "Staan teamleden open voor feedback?",
    description: "Teamleden staan open voor feedback en zijn bereid te leren en te groeien.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "individual"
  },
  {
    id: "ppl_cul_1_ind_3",
    text: "Communiceren teamleden open en respectvol?",
    description: "Teamleden communiceren open en respectvol met elkaar en met stakeholders.",
    perspectiveId: "people",
    plateauId: "reactive",
    levelId: "individual"
  },
  
  //===================================================================================
  // PEOPLE & CULTURE - PLATEAU 2 (PROACTIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "ppl_cul_2_org_1",
    text: "Is er een uitgebreid ontwikkelprogramma voor teams en individuen?",
    description: "Er is een uitgebreid ontwikkelprogramma dat teams en individuen helpt groeien en excelleren.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "ppl_cul_2_org_2",
    text: "Worden communities of practice gefaciliteerd?",
    description: "De organisatie faciliteert communities of practice voor kennisdeling en samenwerking.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "ppl_cul_2_org_3",
    text: "Is er een cultuur van vertrouwen en eigenaarschap?",
    description: "Er is een cultuur van vertrouwen en eigenaarschap waarin teams worden gestimuleerd zelfstandig te werken.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "ppl_cul_2_org_4",
    text: "Wordt talent actief ontwikkeld en behouden?",
    description: "De organisatie investeert actief in het ontwikkelen en behouden van talent.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "ppl_cul_2_org_5",
    text: "Is er een beleid voor duurzame inzetbaarheid?",
    description: "Er is een beleid voor duurzame inzetbaarheid en werk-privé balans.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "organization"
  },
  
  // Team Level
  {
    id: "ppl_cul_2_team_1",
    text: "Is er een cultuur van continu leren en kennisdeling binnen het team?",
    description: "Het team heeft een cultuur van continu leren en actieve kennisdeling, zowel intern als met andere teams.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "ppl_cul_2_team_2",
    text: "Benut het team diversiteit en verschillende perspectieven?",
    description: "Het team benut diversiteit en verschillende perspectieven om tot betere oplossingen te komen.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "ppl_cul_2_team_3",
    text: "Heeft het team een hoge mate van psychologische veiligheid?",
    description: "Er is een hoge mate van psychologische veiligheid waarin teamleden zich vrij voelen om risico's te nemen.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "ppl_cul_2_team_4",
    text: "Organiseert het team proactief teambuilding-activiteiten?",
    description: "Het team organiseert proactief teambuilding-activiteiten om de samenwerking te versterken.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "ppl_cul_2_team_5",
    text: "Is er een proactieve benadering van welzijn binnen het team?",
    description: "Het team heeft een proactieve benadering van het welzijn van teamleden.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "ppl_cul_2_ind_1",
    text: "Nemen teamleden initiatief voor hun professionele ontwikkeling?",
    description: "Teamleden nemen initiatief voor hun professionele ontwikkeling en leren nieuwe vaardigheden.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "individual"
  },
  {
    id: "ppl_cul_2_ind_2",
    text: "Geven en ontvangen teamleden regelmatig feedback?",
    description: "Teamleden geven en ontvangen regelmatig constructieve feedback om te groeien.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "individual"
  },
  {
    id: "ppl_cul_2_ind_3",
    text: "Dragen teamleden bij aan een positieve teamcultuur?",
    description: "Teamleden dragen actief bij aan het creëren en behouden van een positieve teamcultuur.",
    perspectiveId: "people",
    plateauId: "proactive",
    levelId: "individual"
  },
  
  //===================================================================================
  // PEOPLE & CULTURE - PLATEAU 3 (INNOVATIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "ppl_cul_3_org_1",
    text: "Is er een innovatieve organisatiecultuur die nieuwe ideeën stimuleert?",
    description: "Er is een innovatieve organisatiecultuur die experimenteren, leren en nieuwe ideeën stimuleert.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "ppl_cul_3_org_2",
    text: "Zijn er programma's voor leiderschap en mentorschap?",
    description: "Er zijn programma's voor leiderschap en mentorschap die toekomstige leiders ontwikkelen.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "ppl_cul_3_org_3",
    text: "Worden nieuwe werkmethoden en -vormen ondersteund?",
    description: "De organisatie ondersteunt en stimuleert nieuwe werkmethoden en -vormen.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "ppl_cul_3_org_4",
    text: "Is de organisatie een aanjager van innovatie in de sector?",
    description: "De organisatie is een aanjager van innovatie in de sector en deelt kennis en best practices.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "ppl_cul_3_org_5",
    text: "Is er een cultuur van purpose-driven werken?",
    description: "Er is een cultuur van purpose-driven werken waarin mensen worden verbonden door een gemeenschappelijk doel.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "organization"
  },
  
  // Team Level
  {
    id: "ppl_cul_3_team_1",
    text: "Is het team in staat om zichzelf aan te passen en te innoveren?",
    description: "Het team kan zichzelf aanpassen aan veranderende omstandigheden en zoekt actief naar innovatieve oplossingen.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "ppl_cul_3_team_2",
    text: "Experimenteert het team met nieuwe samenwerkingsvormen?",
    description: "Het team experimenteert met nieuwe samenwerkingsvormen en werkwijzen.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "ppl_cul_3_team_3",
    text: "Deelt het team kennis en ervaring buiten de organisatie?",
    description: "Het team deelt kennis en ervaring actief binnen en buiten de organisatie (o.a. blogposts, conferenties).",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "ppl_cul_3_team_4",
    text: "Heeft het team een zelflerende cultuur?",
    description: "Het team heeft een zelflerende cultuur waarin continu experimenteren en verbeteren centraal staat.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "ppl_cul_3_team_5",
    text: "Is het team een rolmodel voor andere teams?",
    description: "Het team is een rolmodel voor andere teams en deelt best practices en lessen.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "ppl_cul_3_ind_1",
    text: "Zijn teamleden ambassadeurs voor innovatie en vernieuwing?",
    description: "Teamleden zijn ambassadeurs voor innovatie en vernieuwing binnen en buiten het team.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "individual"
  },
  {
    id: "ppl_cul_3_ind_2",
    text: "Coachen en mentoren teamleden anderen binnen en buiten het team?",
    description: "Teamleden coachen en mentoren anderen binnen en buiten het team om te groeien en ontwikkelen.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "individual"
  },
  {
    id: "ppl_cul_3_ind_3",
    text: "Dragen teamleden bij aan innovatieve oplossingen?",
    description: "Teamleden dragen actief bij aan het ontwikkelen van innovatieve oplossingen voor complexe problemen.",
    perspectiveId: "people",
    plateauId: "innovative",
    levelId: "individual"
  },
  
  //===================================================================================
  // PROCESSES & INFORMATION - PLATEAU 1 (REACTIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "proc_inf_1_org_1",
    text: "Worden teams actief gefaciliteerd om deel te nemen in het voortbrengingsproces?",
    description: "Teams worden actief gefaciliteerd om deel te nemen in het voortbrengingsproces.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "proc_inf_1_org_2",
    text: "Zijn er basisprocessen voor projectmanagement en governance?",
    description: "Er zijn basisprocessen voor projectmanagement en governance die teams kunnen volgen.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "proc_inf_1_org_3",
    text: "Is er een informatiearchitectuur die teams ondersteunt?",
    description: "Er is een informatiearchitectuur die teams ondersteunt bij het delen en vinden van informatie.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "proc_inf_1_org_4",
    text: "Zijn er centrale repositories voor documentatie en informatie?",
    description: "Er zijn centrale repositories voor documentatie en informatie die toegankelijk zijn voor teams.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "organization"
  },
  {
    id: "proc_inf_1_org_5",
    text: "Zijn er basisprocessen voor kennismanagement?",
    description: "Er zijn basisprocessen voor kennismanagement en kennisdeling binnen de organisatie.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "organization"
  },
  
  // Team Level
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
  {
    id: "proc_inf_1_team_3",
    text: "Heeft het team een structuur voor het beheren van informatie?",
    description: "Het team heeft een basisstructuur voor het beheren en delen van informatie.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "proc_inf_1_team_4",
    text: "Houdt het team regelmatig ceremonies (standup, planning, review)?",
    description: "Het team houdt regelmatig ceremonies zoals standups, plannings en reviews.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "team"
  },
  {
    id: "proc_inf_1_team_5",
    text: "Is er een backlog met geprioriteerde taken?",
    description: "Het team heeft een backlog met geprioriteerde taken die regelmatig wordt bijgewerkt.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "proc_inf_1_ind_1",
    text: "Volgen teamleden de vastgestelde werkprocessen?",
    description: "Teamleden volgen de vastgestelde werkprocessen en dragen bij aan de verbetering ervan.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "individual"
  },
  {
    id: "proc_inf_1_ind_2",
    text: "Documenteren teamleden hun werk volgens afspraken?",
    description: "Teamleden documenteren hun werk volgens de afgesproken standaarden en processen.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "individual"
  },
  {
    id: "proc_inf_1_ind_3",
    text: "Communiceren teamleden duidelijk over de status van hun werk?",
    description: "Teamleden communiceren duidelijk over de status en voortgang van hun werk.",
    perspectiveId: "processes",
    plateauId: "reactive",
    levelId: "individual"
  },
  
  //===================================================================================
  // PROCESSES & INFORMATION - PLATEAU 2 (PROACTIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "proc_inf_2_org_1",
    text: "Zijn er gestandaardiseerde processen voor Continuous Integration/Delivery?",
    description: "Er zijn gestandaardiseerde processen voor Continuous Integration en Continuous Delivery.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "proc_inf_2_org_2",
    text: "Is er een datamanagement strategie binnen de organisatie?",
    description: "Er is een datamanagement strategie die teams helpt bij het effectief beheren en gebruiken van data.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "proc_inf_2_org_3",
    text: "Worden processen regelmatig geëvalueerd en verbeterd?",
    description: "Processen worden regelmatig geëvalueerd en verbeterd op basis van feedback en metingen.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "proc_inf_2_org_4",
    text: "Is er een proces voor effectief portfoliomanagement?",
    description: "Er is een proces voor effectief portfoliomanagement dat helpt bij het prioriteren van projecten.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "organization"
  },
  {
    id: "proc_inf_2_org_5",
    text: "Is er een structuur voor enterprise architectuur?",
    description: "Er is een structuur voor enterprise architectuur die teams helpt bij het maken van technische keuzes.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "organization"
  },
  
  // Team Level
  {
    id: "proc_inf_2_team_1",
    text: "Werkt het team met gestructureerde backlogs en prioritering?",
    description: "Het team werkt met gestructureerde backlogs, prioritering, en regelmatige refinement sessies.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "proc_inf_2_team_2",
    text: "Heeft het team een proces voor kwaliteitsborging?",
    description: "Het team heeft een gestructureerd proces voor kwaliteitsborging, inclusief code reviews en test automation.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "proc_inf_2_team_3",
    text: "Worden werkprocessen regelmatig geëvalueerd en verbeterd?",
    description: "Het team evalueert regelmatig zijn werkprocessen en implementeert verbeteringen.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "proc_inf_2_team_4",
    text: "Heeft het team een kennismanagement strategie?",
    description: "Het team heeft een strategie voor kennismanagement en kennisdeling.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "team"
  },
  {
    id: "proc_inf_2_team_5",
    text: "Gebruikt het team data om beslissingen te nemen?",
    description: "Het team gebruikt data om beslissingen te nemen en processen te verbeteren.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "proc_inf_2_ind_1",
    text: "Dragen teamleden bij aan procesverbeteringen?",
    description: "Teamleden dragen actief bij aan het identificeren en implementeren van procesverbeteringen.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "individual"
  },
  {
    id: "proc_inf_2_ind_2",
    text: "Zoeken teamleden proactief naar efficiëntere manieren van werken?",
    description: "Teamleden zoeken proactief naar efficiëntere manieren van werken en delen deze met het team.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "individual"
  },
  {
    id: "proc_inf_2_ind_3",
    text: "Zijn teamleden vaardig in datagedreven besluitvorming?",
    description: "Teamleden zijn vaardig in het gebruiken van data voor besluitvorming en procesverbetering.",
    perspectiveId: "processes",
    plateauId: "proactive",
    levelId: "individual"
  },
  
  //===================================================================================
  // PROCESSES & INFORMATION - PLATEAU 3 (INNOVATIVE)
  //===================================================================================
  
  // Organization Level
  {
    id: "proc_inf_3_org_1",
    text: "Is er een cultuur van continue procesverbetering en innovatie?",
    description: "Er is een cultuur van continue procesverbetering en innovatie binnen de organisatie.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "proc_inf_3_org_2",
    text: "Is er een geavanceerde data analytics strategie?",
    description: "Er is een geavanceerde data analytics strategie die teams helpt bij het maken van datagedreven beslissingen.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "proc_inf_3_org_3",
    text: "Worden processen geoptimaliseerd met behulp van AI en automatisering?",
    description: "Processen worden geoptimaliseerd met behulp van AI, machinelearning en geavanceerde automatisering.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "proc_inf_3_org_4",
    text: "Is er een proces voor het adopteren van innovatieve werkmethoden?",
    description: "Er is een proces voor het identificeren, evalueren en adopteren van innovatieve werkmethoden.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "organization"
  },
  {
    id: "proc_inf_3_org_5",
    text: "Worden zakelijke en IT-processen volledig geïntegreerd?",
    description: "Zakelijke en IT-processen zijn volledig geïntegreerd, wat leidt tot een naadloze samenwerking.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "organization"
  },
  
  // Team Level
  {
    id: "proc_inf_3_team_1",
    text: "Gebruikt het team geavanceerde metrics en data-analyse?",
    description: "Het team gebruikt geavanceerde metrics en data-analyse om de prestaties te meten en te verbeteren.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "proc_inf_3_team_2",
    text: "Experimenteert het team met nieuwe procesmodellen en werkmethoden?",
    description: "Het team experimenteert met nieuwe procesmodellen en werkmethoden om effectiever te worden.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "proc_inf_3_team_3",
    text: "Ontwikkelt het team innovatieve processen die als voorbeeld dienen?",
    description: "Het team ontwikkelt innovatieve processen die als voorbeeld dienen voor andere teams.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "proc_inf_3_team_4",
    text: "Gebruikt het team AI en automatisering voor procesoptimalisatie?",
    description: "Het team gebruikt AI en automatisering om processen te optimaliseren en routine taken te elimineren.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "team"
  },
  {
    id: "proc_inf_3_team_5",
    text: "Heeft het team een datagedreven besluitvormingscultuur?",
    description: "Het team heeft een volledig datagedreven besluitvormingscultuur.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "team"
  },
  
  // Individual Level
  {
    id: "proc_inf_3_ind_1",
    text: "Zijn teamleden ambassadeurs van procesverbeteringen en innovatie?",
    description: "Teamleden zijn ambassadeurs van procesverbeteringen en innovatie binnen en buiten het team.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "individual"
  },
  {
    id: "proc_inf_3_ind_2",
    text: "Ontwikkelen teamleden nieuwe tools of methoden voor procesverbetering?",
    description: "Teamleden ontwikkelen nieuwe tools of methoden voor procesverbetering en delen deze met de organisatie.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "individual"
  },
  {
    id: "proc_inf_3_ind_3",
    text: "Zijn teamleden vaardig in het gebruik van geavanceerde data-analysetools?",
    description: "Teamleden zijn vaardig in het gebruik van geavanceerde data-analysetools en -technieken.",
    perspectiveId: "processes",
    plateauId: "innovative",
    levelId: "individual"
  }
];