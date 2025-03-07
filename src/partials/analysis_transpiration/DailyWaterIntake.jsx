import React from 'react';

function DailyWaterIntake({ waterAmount = 0.011155380252068756 }) {
  // 소수점 넷째 자리까지 반올림하는 함수
  const formattedAmount = waterAmount.toFixed(4)
  console.log(formattedAmount)
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-sky-100 dark:bg-sky-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">최근 7일간의 평균 증발산량</h2>
      </header>
      <div className="p-3">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {formattedAmount} mm/h
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
            시간당 <span className="font-semibold">{formattedAmount}</span> mm의 평균 증발산량을 보입니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyWaterIntake;