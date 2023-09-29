import { Pokemon } from "@/app/page";

interface Props {
  params: {
    name: string;
  };
}

export default async function PokemonPage({ params }: Props) {
  const name = params.name;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();

  const p = {
    id: data.id,
    name: data.name,
    image: {
      front: data.sprites.front_default,
      back: data.sprites.back_default,
    },
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
    weight: data.weight,
  };

  return (
    <main className=" bg-gray-600 text-white min-h-screen">
      <header className="py-4 px-8 border-b bg-gray-600 border-white text-center">
        <h1 className="text-4xl font-serif pl-3">
          {" "}
          {name[0].toUpperCase() + name.slice(1)}
        </h1>
      </header>
      <div className="px-20 grid grid-cols-2">
        <div className=" flex justify-center items-center">
          <img
            className="h-40 w-40"
            src={data.sprites.front_default}
            alt="react image"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            className="h-40 w-40"
            src={data.sprites.back_default}
            alt="react image"
          />
        </div>
      </div>
      <div className="text-center">ID: {data.id}</div>
      <div className="text-center">Name: {name[0].toUpperCase() + name.slice(1)}</div>
      <div className="text-center">Weight: {data.weight}</div>
    </main>
  );
}
