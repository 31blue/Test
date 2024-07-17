import React from 'react';
import LineChart01 from '../../charts/LineChart01';

function WeeklyPhotosynthesis() {
  // 실제 데이터로 대체해야 합니다
  const weeklyData = [/* ... */];

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">일주일 광합성량</h2>
      </header>
      <div className="p-3">
        <div className="flex-grow">
          <LineChart01 data={weeklyData} width={595} height={248} />
        </div>
      </div>
    </div>
  );
}

export default WeeklyPhotosynthesis;