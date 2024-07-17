import React from 'react';

function DashboardCardPlantPhysical({ height, leafCount, leafArea }) {
  // 기본값 설정
  const displayHeight = height || '10cm';
  const displayLeafCount = leafCount || 2;
  const displayLeafArea = leafArea || '10cm²';

  console.log('DashboardCardPlantPhysical', { 
    height: displayHeight, 
    leafCount: displayLeafCount, 
    leafArea: displayLeafArea 
  });

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">물리적 특성</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">크기</h3>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{displayHeight}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">잎의 갯수</h3>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{displayLeafCount}개</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">잎의 넓이</h3>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{displayLeafArea}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCardPlantPhysical;