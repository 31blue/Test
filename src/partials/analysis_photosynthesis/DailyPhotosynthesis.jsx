import React from 'react';
import BarChart01 from '../../charts/BarChart01';

function DailyPhotosynthesis() {
  // 실제 데이터로 대체해야 합니다
  const photosynthesisData = [/* ... */];
  const yesterdayTotal = 100;
  const todayTotal = 120;
  const difference = todayTotal - yesterdayTotal;
  const sign = difference >= 0 ? '+' : '-';

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">오늘의 광합성량</h2>
      </header>
      <div className="p-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{todayTotal}</div>
          <div className={`text-sm font-semibold ${difference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {sign}{Math.abs(difference)} 어제 대비
          </div>
        </div>
        <div className="flex-grow">
          <BarChart01 data={photosynthesisData} width={595} height={248} />
        </div>
      </div>
    </div>
  );
}

export default DailyPhotosynthesis;