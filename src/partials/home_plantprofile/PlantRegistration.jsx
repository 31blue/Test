import React from 'react';

function formatDateTime(dateString) {
  if (!dateString) return '2024-07-25 00:00:00'; // 기본값

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '2024-07-25 00:00:00'; // 유효하지 않은 날짜인 경우 기본값 반환

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function PlantRegistration({ date }) {
  const displayDateTime = formatDateTime(date);

  console.log('DashboardCardPlantRegistration', { date: displayDateTime });

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">등록 날짜 및 시간</h2>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{displayDateTime}</p>
      </div>
    </div>
  );
}

export default PlantRegistration;