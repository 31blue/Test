import React from 'react';

// 현재 날짜와 일주일 전 날짜를 계산하는 함수
const getWeekRange = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 6); // 일주일 전 날짜

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const startYear = startDate.getFullYear();
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const startDay = String(startDate.getDate()).padStart(2, '0');

  return {
    start: `${startYear}-${startMonth}-${startDay}`,
    end: `${year}-${month}-${day}`,
  };
};

function TotalPhotosynthesis({ day_avg_photo, week_avg_O2 }) {
  // 평균 일일 광합성량 계산
  if(day_avg_photo === null){
    day_avg_photo = [1];
  }
  const avgDailyPhotosynthesis = Array.isArray(day_avg_photo) && day_avg_photo.length > 0 
  ? day_avg_photo.reduce((sum, value) => sum + value, 0) / day_avg_photo.length 
  : 0;
  
  // 주간 총 광합성량 계산 (μmol m⁻² s⁻¹)
  const totalPhotosynthesis = avgDailyPhotosynthesis * 7;
  
  // 주간 총 산소 생성량 계산 (L)
  const totalOxygen = week_avg_O2 * 7;

  const { start, end } = getWeekRange();

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          최근 일주일 간의 합산 수치
        </h2>
        <p className="text-xs text-gray-500 italic text-right">
          {start} ~ {end}
        </p>
        <div className="flex items-start mt-4">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {totalPhotosynthesis.toFixed(2)}
          </div>
          <div className="text-sm font-semibold text-gray-400 dark:text-gray-500">
            총 광합성량 (μmol m⁻² s⁻¹)
          </div>
        </div>
      </div>
      <div className="px-5 pt-3 pb-5">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {totalOxygen.toFixed(2)}
          </div>
          <div className="text-sm font-semibold text-gray-400 dark:text-gray-500">
            총 산소량 (L)
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalPhotosynthesis;