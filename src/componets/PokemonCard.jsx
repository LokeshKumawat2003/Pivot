import React from 'react';

const PokemonCard = ({ poke, i }) => {
  return (
    <div
      key={i}
      className="bg-white shadow-lg p-4 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-blue-50"
    >
      <img
        src={poke.sprite}
        alt={poke.name}
        className="w-32 h-32 mx-auto mb-4 transition-transform transform hover:scale-110"
      />
      <h2 className="text-xl font-semibold capitalize text-gray-800 mb-2">{poke.name}</h2>
      <p className="text-gray-500">ID: {poke.id}</p>
      <div className="mt-2">
        {poke.types.map((type) => (
          <span
            key={`${i}-${type}`}
            className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 transition-colors hover:bg-blue-200"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
