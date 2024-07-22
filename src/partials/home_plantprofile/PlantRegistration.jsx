import React from 'react';

function PlantRegistration({ date }) {
  // Use the provided date or default to '2024-08-07' if it's undefined or an empty string
  const displayDate = date && date.trim() !== '' ? date : '2024-08-07';

  console.log('DashboardCardPlantRegistration', { date: displayDate });

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">등록 날짜</h2>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{displayDate}</p>
      </div>
    </div>
  );
}

export default PlantRegistration;
