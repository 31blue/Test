import React from 'react';

function Testevapo({ plantData }) {
  // plantData는 이제 단일 숫자 값입니다 (week_avg_evapo)
  const formattedValue = Number(plantData).toFixed(4);

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">주간 평균 증발산량</h2>
      </header>
      <div className="p-3">
        <div className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
          {formattedValue} mm/h
        </div>
        <div className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
          지난 주 평균 증발산량
        </div>
      </div>
    </div>
  );
}

export default Testevapo;
