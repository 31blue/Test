import React from 'react';

function PlantSpecies({ species }) {
  // Use the provided species or default to '바질' if it's undefined or an empty string
  const displaySpecies = species && species.trim() !== '' ? species : '바질';

  console.log('DashboardCardPlantSpecies', { species: displaySpecies });

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">종</h2>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{displaySpecies}</p>
      </div>
    </div>
  );
}

export default PlantSpecies;