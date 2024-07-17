import React from 'react';

function TotalEvapotranspiration() {
  // 실제 데이터로 대체해야 합니다
  const totalEvapotranspiration = 5000;
  const totalWaterLoss = 2500;

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">합산</h2>
      </header>
      <div className="p-3">
        <div className="mb-2">
          <div className="flex items-start">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{totalEvapotranspiration}</div>
            <div className="text-sm font-semibold text-gray-400 dark:text-gray-500">총 증발산량</div>
          </div>
        </div>
        <div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{totalWaterLoss}</div>
            <div className="text-sm font-semibold text-gray-400 dark:text-gray-500">총 수분 손실량</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalEvapotranspiration;