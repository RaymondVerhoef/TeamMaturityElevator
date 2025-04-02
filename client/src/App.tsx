import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Assessment from "@/pages/Assessment";
import Results from "@/pages/Results";
import Teams from "@/pages/Teams";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assessment/:id" component={Assessment} />
      <Route path="/results/:id" component={Results} />
      <Route path="/teams" component={Teams} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
