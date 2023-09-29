"use client";
import InfoCard from "@/components/info-card";
import { useEffect, useState } from "react";

export type Pokemon = {
  id: number;
  name: string;
  image: {
    front: string;
    back: string;
  };
  types: string[];
  weight: number;
};

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();

        const urls = data.results.map((p: { url: string }) => p.url);

        const pokemonData = await Promise.all(
          urls.map(async (url: string) => {
            const response = await fetch(url);
            const p = await response.json();

            return {
              id: p.id,
              name: p.name,
              image: {
                front: p.sprites.front_default,
                back: p.sprites.back_default,
              },
              types: p.types.map(
                (t: { type: { name: string } }) => t.type.name
              ),
              weight: p.weight,
            };
          })
        );

        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching all pokemon", error);
        alert("Error");
      }
    };
    getAllPokemon();
  }, []);

  return (
    <main className=" bg-gray-600 text-white min-h-screen text-center">
      <header className="py-4 px-8 border-b bg-gray-600 border-white">
        <h1 className="text-4xl font-serif"> My pokédex</h1>
      </header>
      <div className="grid grid-cols-3 gap-8 p-8">
        {pokemon.map((p: Pokemon) => (
          <InfoCard key={p.name} pokemon={p} />
        ))}
      </div>
    </main>
  );
}
