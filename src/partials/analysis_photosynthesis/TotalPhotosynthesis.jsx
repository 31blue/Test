import React from 'react';

function TotalPhotosynthesis() {
  // 실제 데이터로 대체해야 합니다
  const totalPhotosynthesis = 1000;
  const totalOxygen = 500;

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">등록한 후 지금까지</h2>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{totalPhotosynthesis}</div>
          <div className="text-sm font-semibold text-gray-400 dark:text-gray-500">총 광합성량</div>
        </div>
      </div>
      <div className="px-5 pt-3 pb-5">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{totalOxygen}</div>
          <div className="text-sm font-semibold text-gray-400 dark:text-gray-500">총 산소량</div>
        </div>
      </div>
    </div>
  );
}

export default TotalPhotosynthesis;