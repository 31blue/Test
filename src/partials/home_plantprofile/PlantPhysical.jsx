import React from 'react';

function PlantPhysical({ plantData }) {
  // plantData에서 disease와 pest 정보를 가져옴
  const hasDisease = plantData?.has_disease ?? false;
  const hasPest = plantData?.has_pest ?? false;

  // plantData를 콘솔에 출력하여 확인
  console.log('PlantPhysical', { hasDisease, hasPest, plantData });

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">식물 건강 상태</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-3 ${hasDisease ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <p className="text-gray-800 dark:text-gray-100">
              {hasDisease ? '병 감염 의심' : '병 감염 없음'}
            </p>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-3 ${hasPest ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <p className="text-gray-800 dark:text-gray-100">
              {hasPest ? '병충해 발생 의심' : '병충해 없음'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantPhysical;