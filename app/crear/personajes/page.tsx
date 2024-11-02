"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCircle, ArrowRight, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
}

export default function Personajes() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storyArgument = localStorage.getItem("storyArgument");
    if (!storyArgument) {
      router.push("/crear");
      return;
    }

    // Load initial characters
    const savedCharacters = localStorage.getItem("storyCharacters");
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
      setLoading(false);
    } else {
      // Default characters if none exist
      const defaultCharacters = [
        {
          id: "1",
          name: "Luna",
          role: "Protagonista",
          description: "Una niña curiosa y valiente de 10 años con una imaginación desbordante."
        },
        {
          id: "2",
          name: "Sr. Whiskers",
          role: "Compañero",
          description: "Un gato mágico que puede hablar y guía a Luna en sus aventuras."
        },
        {
          id: "3",
          name: "Guardián del Bosque",
          role: "Mentor",
          description: "Un antiguo espíritu del bosque que protege los secretos de la naturaleza."
        }
      ];
      setCharacters(defaultCharacters);
      localStorage.setItem("storyCharacters", JSON.stringify(defaultCharacters));
      setLoading(false);
    }
  }, [router]);

  const handleSaveCharacter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCharacter = {
      id: editingCharacter?.id || Date.now().toString(),
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      description: formData.get("description") as string,
    };

    if (editingCharacter) {
      setCharacters(prev => prev.map(char => 
        char.id === editingCharacter.id ? newCharacter : char
      ));
    } else {
      setCharacters(prev => [...prev, newCharacter]);
    }

    localStorage.setItem("storyCharacters", JSON.stringify(
      editingCharacter 
        ? characters.map(char => char.id === editingCharacter.id ? newCharacter : char)
        : [...characters, newCharacter]
    ));

    setIsDialogOpen(false);
    setEditingCharacter(null);
  };

  const handleDeleteCharacter = (id: string) => {
    const updatedCharacters = characters.filter(char => char.id !== id);
    setCharacters(updatedCharacters);
    localStorage.setItem("storyCharacters", JSON.stringify(updatedCharacters));
  };

  const handleEditCharacter = (character: Character) => {
    setEditingCharacter(character);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingCharacter(null);
    setIsDialogOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Personajes de tu Historia</h1>
          <p className="text-gray-300 mb-6">
            Conoce y personaliza los personajes que darán vida a tu cuento
          </p>
          <Button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 text-white"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Añadir Personaje
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse text-white">Cargando personajes...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {characters.map((character) => (
                <Card key={character.id} className="bg-white/10 backdrop-blur-sm border-white/20 group">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <UserCircle className="h-12 w-12 text-yellow-400" />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white">{character.name}</h3>
                        <p className="text-sm text-gray-400">{character.role}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          onClick={() => handleEditCharacter(character)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-gray-400 hover:text-red-400"
                          onClick={() => handleDeleteCharacter(character.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-300">{character.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
                onClick={() => router.push("/crear/generar")}
                disabled={characters.length === 0}
              >
                Siguiente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingCharacter ? "Editar Personaje" : "Nuevo Personaje"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveCharacter} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Nombre</label>
              <Input
                name="name"
                defaultValue={editingCharacter?.name}
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Nombre del personaje"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Rol</label>
              <Select name="role" defaultValue={editingCharacter?.role || "Protagonista"} required>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Protagonista">Protagonista</SelectItem>
                  <SelectItem value="Antagonista">Antagonista</SelectItem>
                  <SelectItem value="Compañero">Compañero</SelectItem>
                  <SelectItem value="Mentor">Mentor</SelectItem>
                  <SelectItem value="Secundario">Secundario</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Descripción</label>
              <Textarea
                name="description"
                defaultValue={editingCharacter?.description}
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Describe al personaje..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black"
              >
                {editingCharacter ? "Guardar Cambios" : "Crear Personaje"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}