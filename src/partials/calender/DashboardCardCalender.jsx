// src/partials/dashboard/DashboardCardCalendar.jsx
import React from 'react';

function DashboardCardCalendar({ month, year }) {
  // 해당 월의 첫 날짜와 마지막 날짜를 구합니다.
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 달력에 표시할 날짜들을 생성합니다.
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const calendarDays = Array(42).fill(null).map((_, index) => {
    const day = index - startingDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          {`${year}년 ${month + 1}월`}
        </h2>
      </header>
      <div className="p-3">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-center font-semibold">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div 
              key={index} 
              className={`aspect-square flex items-center justify-center ${
                day ? 'bg-gray-100 dark:bg-gray-700' : ''
              } rounded-lg`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardCardCalendar;