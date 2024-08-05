import React from 'react';

function PlantPhysical({ plantData }) {
  // plantData에서 plant_height 정보를 가져옴
  const displayHeight = plantData && plantData.plant_height ? `${plantData.plant_height}cm` : '8cm';

  // plantData를 콘솔에 출력하여 확인
  console.log('PlantPhysical', { height: displayHeight, plantData });

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">식물의 키</h2>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{displayHeight}</p>
      </div>
    </div>
  );
}

export default PlantPhysical;