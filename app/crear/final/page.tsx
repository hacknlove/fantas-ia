"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Upload, Wand2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TalePage {
  content: string;
  imageUrl: string;
}

export default function FinalTale() {
  const [currentPage, setCurrentPage] = useState(1);
  const [story, setStory] = useState<string[]>([]);
  const [pages, setPages] = useState<TalePage[]>([]);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedStory = localStorage.getItem("fullStory");
    if (savedStory) {
      const storyArray = JSON.parse(savedStory);
      setStory(storyArray);
      
      // Initialize pages with default images
      const initialPages = storyArray.map((content: string) => ({
        content,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400`
      }));
      setPages(initialPages);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPages = [...pages];
        newPages[currentPage - 1] = {
          ...newPages[currentPage - 1],
          imageUrl: reader.result as string
        };
        setPages(newPages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    // Simulate image generation with a placeholder
    setTimeout(() => {
      const newPages = [...pages];
      newPages[currentPage - 1] = {
        ...newPages[currentPage - 1],
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400`
      };
      setPages(newPages);
      setIsGenerating(false);
      setImagePrompt("");
    }, 1500);
  };

  if (!pages.length) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Tu Cuento</h1>
          <p className="text-gray-300">
            Página {currentPage} de {pages.length}
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden mb-8">
          <div className="relative aspect-[2/1] overflow-hidden">
            <img
              src={pages[currentPage - 1].imageUrl}
              alt={`Ilustración página ${currentPage}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-gray-200 text-lg leading-relaxed">
              {pages[currentPage - 1].content}
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-2">Generar Imagen</h3>
            <div className="flex gap-2">
              <Textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Describe la imagen que deseas generar..."
                className="bg-gray-800 border-gray-700 text-white resize-none"
              />
              <Button
                onClick={handleGenerateImage}
                disabled={!imagePrompt || isGenerating}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isGenerating ? "Generando..." : "Generar"}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-2">Subir Imagen</h3>
            <div className="flex gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md"
              />
              <Button
                onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Subir
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(pages.length, prev + 1))}
            disabled={currentPage === pages.length}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
          >
            Siguiente
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  );
}