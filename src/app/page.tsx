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
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e: any) => {
    setFilter(e.target.value);
  };

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
    <main className=" bg-gray-600 text-white min-h-screen">

      <header className="py-4 px-8 border-b bg-gray-600 border-white flex">
        <h1 className="text-4xl font-serif pl-3 flex-1"> My pokédex</h1>
         
        <div className="pt-4 -400 text-black text-right ">
          <input onChange={handleSearchChange} type="text" id="search-input" placeholder=" Search pokemon" />
        </div>

      </header>
      <div className="grid grid-cols-3 gap-8 p-8 text-center">
        {pokemon.map((p: Pokemon) => 
        (
          <InfoCard key={p.name} pokemon={p} filter={filter}/>
        ))}
      </div>
    </main>
  );
}
