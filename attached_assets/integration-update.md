# Bijgewerkte Integratiehandleiding voor ConversationGuide

De ConversationGuide component is nu aangepast om beter te werken met je bestaande codebase. Hier is hoe je het kunt integreren:

## 1. Component Toevoegen

Maak een nieuw bestand aan in je codebase:

```
client/src/components/conversation/ConversationGuide.jsx
```

Kopieer de bijgewerkte ConversationGuide component hierin.

## 2. Beslisboom Toevoegen

Er zijn twee manieren om de beslisboom te integreren:

### Optie 1: Als apart bestand

1. Maak een nieuw bestand aan in je codebase:

```
client/src/lib/conversationTree.js
```

2. Kopieer de inhoud van het `decision-tree` artifact naar dit bestand.

3. Importeer en gebruik het in je Assessment pagina:

```javascript
import { importDecisionTree } from "@/components/conversation/ConversationGuide";
import conversationTree from "@/lib/conversationTree";

// In je component:
const decisionTree = importDecisionTree(conversationTree);
```

### Optie 2: Direct in de Assessment component

Je kunt de beslisboomstructuur ook direct in je Assessment component definiëren:

```javascript
const conversationTree = {
  startNode: {
    id: "start",
    question: "Welkom bij het assessment gesprek...",
    // ... rest van de startNode
  },
  nodes: {
    // ... nodes uit het decision-tree artifact
  }
};
```

## 3. De ConversationGuide component gebruiken

Pas je Assessment pagina aan om de ConversationGuide component te gebruiken, bijvoorbeeld als tab-optie:

```jsx
import ConversationGuide from "@/components/conversation/ConversationGuide";
import conversationTree from "@/lib/conversationTree"; // of direct gedefinieerd
import { importDecisionTree } from "@/components/conversation/ConversationGuide";

// In je component:
const [activeTab, setActiveTab] = useState("list");
const decisionTree = importDecisionTree(conversationTree);

// In je render functie:
<Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="list">Vragenlijst</TabsTrigger>
    <TabsTrigger value="conversation">Gespreksgeleider</TabsTrigger>
  </TabsList>
  
  <TabsContent value="list">
    {/* Bestaande vragenlijst weergave */}
  </TabsContent>
  
  <TabsContent value="conversation">
    <ConversationGuide 
      assessment={assessment}
      team={team}
      onSubmitAnswer={handleQuestionAnswer}
      decisionTree={decisionTree}
      questions={QUESTIONS}
      answerOptions={ANSWER_OPTIONS}
    />
  </TabsContent>
</Tabs>
```

## 4. Integratie met bestaande logica

De component is ontworpen om samen te werken met je bestaande handelingen voor antwoorden. De `onSubmitAnswer` functie die je doorgeeft moet dezelfde structuur hebben als je bestaande `handleQuestionAnswer`:

```javascript
(questionId, answer, notes, perspectiveId, plateauId, levelId) => {
  // Verwerk het antwoord
}
```

## 5. Styling aanpassen

De component gebruikt standaard de Shadcn UI componenten die ook in je huidige applicatie worden gebruikt. Je kunt de styling aanpassen door de className props aan te passen als dat nodig is.

## 6. Volledige beslisboom importeren

Het aangepaste `decision-tree` artifact bevat de volledige structuur die je kunt gebruiken. Zie dit als een uitgangspunt dat je kunt aanpassen aan je specifieke behoeften.

## 7. Prop Types

De ConversationGuide component accepteert de volgende props:

- `assessment`: Het assessment object met informatie over het huidige assessment
- `team`: Het team object met informatie over het team
- `onSubmitAnswer`: Functie om antwoorden te verwerken 
- `decisionTree`: De beslisboomstructuur (optioneel, een eenvoudige standaard wordt gebruikt als deze niet wordt doorgegeven)
- `questions`: Array met alle beschikbare vragen (optioneel)
- `answerOptions`: Array met antwoordopties (optioneel, standaard ja/deels/nee)

## 8. Testen

Nadat je alles hebt geïntegreerd, test de component met een volledige assessment flow om er zeker van te zijn dat:

1. De gespreksflow natuurlijk aanvoelt
2. Antwoorden correct worden opgeslagen
3. De conversatiestroom logisch verloopt van het ene onderwerp naar het andere
