import React from 'react';

function PlantPhysical({ height }) {
  // 기본값 설정
  const displayHeight = height || '10cm';

  console.log('PlantPhysical', { height: displayHeight });

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