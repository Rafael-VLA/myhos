
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
      <div className="text-center space-y-4">
        <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
          Mythos: IA para<span className="text-gradient"> Optimizar <span className="!text-gray-800">y</span> Enriquecer </span>
          tus Historias
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          Nuestra herramienta de inteligencia artificial está diseñada para transformar tus ideas en narrativas cautivadoras y bien elaboradas.
        </p>
      </div>
      <div className="mt-12 justify-center items-center space-x-3 flex">

        <Button variant="default" asChild>
          <Link href="/dashboard">
            Pruébalo
          </Link>
        </Button>

      </div>
    </section>
  );
}