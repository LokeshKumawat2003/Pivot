import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import Filter from "./PokemonTypeFilter";

const PokedexGrid = () => {
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=30");
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchPokemonData();
    fetchPokemonTypes();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchPokemonData = async () => {
    if (loading || !url) return;

    setLoading(true);

    try {
      const response = await axios.get(url);
      const results = response.data.results;

      const newPokemon = await Promise.all(
        results.map(async (poke) => {
          const pokemonDetails = await axios.get(poke.url);
          const pokemonId = poke.url.split("/").filter(Boolean).pop();

          return {
            id: `${poke.name}-${pokemonId}`,
            name: poke.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
            types: pokemonDetails.data.types.map(
              (typeInfo) => typeInfo.type.name
            ),
          };
        })
      );

      setPokemon((prev) => [...prev, ...newPokemon]);
      setUrl(response.data.next);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonTypes = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const typeNames = response.data.results.map((type) => type.name);
      setTypes(typeNames);
    } catch (error) {
      console.error("Error fetching Pokémon types:", error);
    }
  };

  const handleScroll = () => {
    const innerHeight = window.innerHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;

    if (innerHeight + scrollTop >= offsetHeight - 200 && !loading) {
      fetchPokemonData();
    }
  };

  const filteredPokemon = pokemon.filter((poke) => {
    const matchesName = poke.name
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesType = selectedType ? poke.types.includes(selectedType) : true;
    return matchesName && matchesType;
  });

  return (
    <div>
      <Filter
        filterText={filterText}
        setFilterText={setFilterText}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        types={types}
      />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((poke, i) => (
          <PokemonCard key={i} poke={poke} />
        ))}

        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default PokedexGrid;
