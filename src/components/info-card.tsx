import { Pokemon } from "@/app/page";

interface InfoCardProps {
  pokemon: Pokemon;
}

export default function InfoCard({ pokemon }: InfoCardProps) {
  return (
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
      <button className=" text-gray-300 pb-2 hover:underline">See more</button>
    </div>
  );
}
