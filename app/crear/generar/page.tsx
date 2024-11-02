"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Pencil, Check, RotateCw, Book } from "lucide-react";
import { useRouter } from "next/navigation";

interface TextOption {
  id: string;
  content: string;
  isEditing: boolean;
}

const MAX_PAGES = 50;

export default function GenerarTexto() {
  const [currentPage, setCurrentPage] = useState(1);
  const [fullStory, setFullStory] = useState<string[]>([]);
  const [options, setOptions] = useState<TextOption[]>([
    {
      id: "1",
      content: "Había una vez una niña llamada Luna que descubrió un portal mágico en su jardín. Con su gato parlante Sr. Whiskers, se aventuró a explorar un mundo de maravillas.",
      isEditing: false
    },
    {
      id: "2",
      content: "En un jardín encantado, Luna y su fiel compañero Sr. Whiskers encontraron una puerta brillante. Al cruzarla, descubrieron un reino mágico lleno de secretos.",
      isEditing: false
    }
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedStory = localStorage.getItem("fullStory");
    if (savedStory) {
      setFullStory(JSON.parse(savedStory));
    }

    // Generate new options based on current story context
    if (currentPage > 1) {
      setOptions([
        {
          id: "1",
          content: `Continuación ${currentPage}: Luna y Sr. Whiskers descubrieron nuevos secretos en el reino mágico, cada paso revelaba más misterios por resolver.`,
          isEditing: false
        },
        {
          id: "2",
          content: `Página ${currentPage}: Mientras avanzaban por el mundo mágico, Luna y Sr. Whiskers encontraron criaturas asombrosas que les ofrecieron su ayuda.`,
          isEditing: false
        }
      ]);
    }
  }, [currentPage]);

  const handleEdit = (id: string) => {
    setOptions(prev => prev.map(opt => ({
      ...opt,
      isEditing: opt.id === id ? true : false
    })));
  };

  const handleSave = (id: string, newContent: string) => {
    setOptions(prev => prev.map(opt => ({
      ...opt,
      content: opt.id === id ? newContent : opt.content,
      isEditing: false
    })));
  };

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    const selectedText = options.find(opt => opt.id === id)?.content || "";
    
    const newStory = [...fullStory];
    newStory[currentPage - 1] = selectedText;
    setFullStory(newStory);
    
    localStorage.setItem("fullStory", JSON.stringify(newStory));
    localStorage.setItem("currentPage", (currentPage + 1).toString());
  };

  const handleNext = () => {
    if (currentPage < MAX_PAGES) {
      setCurrentPage(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleFinish = () => {
    router.push("/crear/final");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Elige tu Historia</h1>
          <p className="text-gray-300 mb-2">
            Página {currentPage} de {MAX_PAGES}
          </p>
        </div>

        {fullStory.length > 0 && (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Book className="h-5 w-5 text-yellow-400" />
                <h2 className="text-lg font-semibold text-white">Tu historia hasta ahora:</h2>
              </div>
              <div className="space-y-4">
                {fullStory.map((part, index) => (
                  part && (
                    <p key={index} className="text-gray-300 leading-relaxed">
                      {part}
                    </p>
                  )
                ))}
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-6">
          {options.map((option) => (
            <Card 
              key={option.id}
              className={`bg-white/10 backdrop-blur-sm border-2 transition-all ${
                selectedOption === option.id 
                  ? "border-yellow-400" 
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              <div className="p-6">
                {option.isEditing ? (
                  <div className="space-y-4">
                    <Textarea
                      defaultValue={option.content}
                      className="bg-gray-800 border-gray-700 text-white resize-none"
                      rows={3}
                      id={`textarea-${option.id}`}
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave(
                          option.id,
                          (document.getElementById(`textarea-${option.id}`) as HTMLTextAreaElement).value
                        )}
                        className="bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 text-white"
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-200 leading-relaxed">{option.content}</p>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleEdit(option.id)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleSelect(option.id)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Seleccionar
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                      >
                        <RotateCw className="h-4 w-4 mr-2" />
                        Iterar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          {currentPage < MAX_PAGES && (
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
              onClick={handleNext}
              disabled={!selectedOption}
            >
              Siguiente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
          
          <Button
            size="lg"
            className={`bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 text-white font-semibold ${
              currentPage === MAX_PAGES ? 'w-full' : ''
            }`}
            onClick={handleFinish}
            disabled={!selectedOption}
          >
            Finalizar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}