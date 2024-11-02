"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CrearCuento() {
  const [argumento, setArgumento] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the story argument (you might want to use a state management solution in a real app)
    localStorage.setItem("storyArgument", argumento);
    router.push("/crear/personajes");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-2">Crea tu Historia</h1>
          <p className="text-gray-300 mb-6">
            Describe el argumento de tu historia y nuestra IA lo convertirá en un cuento mágico
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Textarea
                placeholder="Escribe aquí el argumento de tu historia..."
                className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                value={argumento}
                onChange={(e) => setArgumento(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
            >
              <SparklesIcon className="mr-2 h-5 w-5" />
              Siguiente
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}