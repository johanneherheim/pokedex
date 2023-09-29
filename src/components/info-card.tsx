import { Pokemon } from "@/app/page";
import Link from "next/link";

interface InfoCardProps {
  pokemon: Pokemon;
  filter: string;
}

export default function InfoCard({ pokemon, filter }: InfoCardProps) {
  return (
    <>
      {pokemon.name.toLowerCase().includes(filter.toLowerCase()) ? (
        <div
          key={pokemon.name}
          className="border border-white bg-gray-600 p-2 rounded-lg"
        >
          <h3 className="capitalize font-semibold pt-1 pb-2 text-lg">
            {pokemon.name}
            <div className=" flex justify-center items-center">
              <img
                className="h-40 w-40"
                src={pokemon.image.front}
                alt="react image"
              />
            </div>
          </h3>
          <button className=" text-gray-300 pb-2 hover:underline">
            <Link href={`/${pokemon.name}`}>See more</Link>
          </button>
        </div>
      ) : null}
    </>
  );
}
