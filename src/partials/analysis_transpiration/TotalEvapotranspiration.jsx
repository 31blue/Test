import React from 'react';

function TotalEvapotranspiration({ weekAvgEvapo }) {
  // 주간 총 증발산량 계산 (주간 평균 * 7일)
  console.log(weekAvgEvapo);
  const totalEvapotranspiration = weekAvgEvapo * 7;

  // 값을 소수점 둘째 자리까지 반올림
  const formattedTotal = totalEvapotranspiration.toFixed(2);

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">최근 7일간의 총 증발산량</h2>
      </header>
      <div className="p-3">
        <div className="mb-2">
          <div className="flex items-start">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2 truncate">
              {formattedTotal}
            </div>
            <div className="text-sm font-semibold text-gray-400 dark:text-gray-500">mm</div>
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          일주일 동안의 총 증발산량입니다.
        </div>
      </div>
    </div>
  );
}

export default TotalEvapotranspiration;
