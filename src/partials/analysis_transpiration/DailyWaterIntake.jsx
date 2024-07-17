import React from 'react';

function DailyWaterIntake({ waterAmount = 1 }) {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-sky-100 dark:bg-sky-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">일평균 물섭취량 수치</h2>
      </header>
      <div className="p-3">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{waterAmount} 리터</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
            하루에 <span className="font-semibold">{waterAmount}</span> 리터의 물을 줘야 합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyWaterIntake;