import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Header from "@/components/Header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, Edit, Plus } from "lucide-react";
import type { Team } from "@shared/schema";

export default function Teams() {
  const { toast } = useToast();
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDomain, setNewTeamDomain] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  // Fetch teams
  const { data: teams, isLoading: isLoadingTeams } = useQuery<Team[]>({
    queryKey: ["/api/teams"],
  });

  // Create team mutation
  const createTeam = useMutation({
    mutationFn: async (data: { name: string; domain: string }) => {
      const res = await apiRequest("POST", "/api/teams", {
        name: data.name,
        domain: data.domain,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Team aangemaakt",
        description: "Het team is succesvol aangemaakt.",
      });
      setNewTeamName("");
      setNewTeamDomain("");
      queryClient.invalidateQueries({ queryKey: ["/api/teams"] });
    },
    onError: (error) => {
      toast({
        title: "Fout bij aanmaken team",
        description: String(error),
        variant: "destructive",
      });
    },
  });

  // Update team mutation
  const updateTeam = useMutation({
    mutationFn: async (data: { id: number; name: string; domain: string }) => {
      const res = await apiRequest("PUT", `/api/teams/${data.id}`, {
        name: data.name,
        domain: data.domain,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Team bijgewerkt",
        description: "Het team is succesvol bijgewerkt.",
      });
      setEditMode(false);
      setTeamToEdit(null);
      queryClient.invalidateQueries({ queryKey: ["/api/teams"] });
    },
    onError: (error) => {
      toast({
        title: "Fout bij bijwerken team",
        description: String(error),
        variant: "destructive",
      });
    },
  });

  // Delete team mutation
  const deleteTeam = useMutation({
    mutationFn: async (teamId: number) => {
      const res = await apiRequest("DELETE", `/api/teams/${teamId}`);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Team verwijderd",
        description: "Het team is succesvol verwijderd.",
      });
      setIsDeleteDialogOpen(false);
      setTeamToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["/api/teams"] });
    },
    onError: (error) => {
      toast({
        title: "Fout bij verwijderen team",
        description: String(error),
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
    },
  });

  const handleCreateTeam = () => {
    if (!newTeamName) {
      toast({
        title: "Voer een naam in",
        description: "Je moet een teamnaam invoeren.",
        variant: "destructive",
      });
      return;
    }

    if (!newTeamDomain) {
      toast({
        title: "Voer een domein in",
        description: "Je moet een domein invoeren.",
        variant: "destructive",
      });
      return;
    }

    createTeam.mutate({
      name: newTeamName,
      domain: newTeamDomain,
    });
  };

  const handleEditTeam = () => {
    if (!teamToEdit) return;

    updateTeam.mutate({
      id: teamToEdit.id,
      name: teamToEdit.name,
      domain: teamToEdit.domain || "Onbekend",
    });
  };

  const handleDeleteClick = (team: Team) => {
    setTeamToDelete(team);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (teamToDelete) {
      deleteTeam.mutate(teamToDelete.id);
    }
  };

  const startEdit = (team: Team) => {
    setTeamToEdit({ ...team });
    setEditMode(true);
  };

  const cancelEdit = () => {
    setTeamToEdit(null);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showUser={false} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8">Team Beheer</h1>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{editMode ? "Team bewerken" : "Nieuw team toevoegen"}</CardTitle>
                <CardDescription>
                  {editMode 
                    ? "Werk de gegevens van het geselecteerde team bij."
                    : "Voeg een nieuw team toe aan de Haags Werken Elevator assessment."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">MDT-Naam</Label>
                  <Input
                    id="team-name"
                    placeholder="Voer de MDT-naam in"
                    value={editMode ? teamToEdit?.name || "" : newTeamName}
                    onChange={(e) => {
                      if (editMode && teamToEdit) {
                        setTeamToEdit({ ...teamToEdit, name: e.target.value });
                      } else {
                        setNewTeamName(e.target.value);
                      }
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="team-domain">Domein</Label>
                  <Input
                    id="team-domain"
                    placeholder="Voer het domein in"
                    value={editMode ? teamToEdit?.domain || "" : newTeamDomain}
                    onChange={(e) => {
                      if (editMode && teamToEdit) {
                        setTeamToEdit({ ...teamToEdit, domain: e.target.value });
                      } else {
                        setNewTeamDomain(e.target.value);
                      }
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {editMode ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={cancelEdit}
                    >
                      Annuleren
                    </Button>
                    <Button 
                      onClick={handleEditTeam}
                      disabled={updateTeam.isPending}
                    >
                      {updateTeam.isPending ? "Bezig met opslaan..." : "Opslaan"}
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handleCreateTeam}
                    disabled={createTeam.isPending}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {createTeam.isPending ? "Bezig met toevoegen..." : "Team Toevoegen"}
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Beschikbare Teams</CardTitle>
                <CardDescription>
                  Beheer de MDT's die beschikbaar zijn voor assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingTeams ? (
                  <div className="py-4 text-center">Teams laden...</div>
                ) : teams?.length ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {teams.map(team => (
                        <div key={team.id} className="flex items-center justify-between p-4 border rounded-md">
                          <div>
                            <div className="font-medium">{team.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Domein: {team.domain || "Onbekend"}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => startEdit(team)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Bewerken
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                              onClick={() => handleDeleteClick(team)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Verwijderen
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    Er zijn nog geen teams toegevoegd.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ben je zeker dat je dit team wilt verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Deze actie kan niet ongedaan worden gemaakt. Als er assessments gekoppeld zijn aan dit team, kunnen deze ontoegankelijk worden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteTeam.isPending ? "Bezig met verwijderen..." : "Verwijderen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}