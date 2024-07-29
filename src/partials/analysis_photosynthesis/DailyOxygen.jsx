import React from 'react';

function DailyOxygen({ day_avg_photo, week_avg_O2 }) {
  // 주간 광합성량 평균 계산
  const avgPhotosynthesis = day_avg_photo.reduce((sum, value) => sum + value, 0) / day_avg_photo.length;
  
  // 값 포맷팅
  const formattedPhotosynthesis = avgPhotosynthesis.toFixed(2);
  const formattedOxygen = Number(week_avg_O2).toFixed(2);

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-green-100 dark:bg-green-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">주간 광합성 및 산소 생성량</h2>
      </header>
      <div className="p-3">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {formattedPhotosynthesis} μmol/m²/s
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
              주간 평균 <span className="font-semibold">{formattedPhotosynthesis}</span> μmol/m²/s의 광합성량을 보입니다.
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {formattedOxygen} L/day
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
              주간 평균 <span className="font-semibold">{formattedOxygen}</span> L/day의 산소를 생성합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyOxygen;