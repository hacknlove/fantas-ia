import { Button } from "@/components/ui/button";
import { BoltIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?q=80&w=2070&auto=format&fit=crop"
          alt="Hero Background"
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <BoltIcon className="h-16 w-16 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            Cuentos con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Fantas-IA
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-200 mb-8">
            Crea tu cuento con inteligencia artificial generativa
          </p>
          <div className="flex items-center justify-center">
            <Link href="/crear">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-colors"
              >
                Comenzar
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-10" />
    </main>
  );
}