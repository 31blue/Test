import React, { useState } from 'react';

function CalendarMain({ currentDate, wateredDates, floweringDates, onWatering, onFlowering }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const calendarDays = Array(42).fill(null).map((_, index) => {
    const day = index - startingDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(new Date(year, month, day));
    }
  };

  const handleWatering = () => {
    if (selectedDate) {
      onWatering(selectedDate);
      setSelectedDate(null);
    }
  };

  const handleFlowering = () => {
    if (selectedDate) {
      onFlowering(selectedDate);
      setSelectedDate(null);
    }
  };

  const isWatered = selectedDate && wateredDates.includes(selectedDate.toDateString());
  const isFlowering = selectedDate && floweringDates.includes(selectedDate.toDateString());

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          {`${year}년 ${month + 1}월 ${currentDate.getDate()}일 (${weekdays[currentDate.getDay()]})`}
        </h2>
        <div>
          <button
            className={`${isWatered ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded mr-2`}
            onClick={handleWatering}
            disabled={!selectedDate || selectedDate > currentDate}
          >
            {isWatered ? '물주기 취소' : '물주기'}
          </button>
          <button
            className={`${isFlowering ? 'bg-red-500 hover:bg-red-700' : 'bg-pink-500 hover:bg-pink-700'} text-white font-bold py-2 px-4 rounded`}
            onClick={handleFlowering}
            disabled={!selectedDate || selectedDate > currentDate}
          >
            {isFlowering ? '개화 취소' : '개화'}
          </button>
        </div>
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
          {calendarDays.map((day, index) => {
            const isFutureDate = day && new Date(year, month, day) > currentDate;
            return (
              <div 
                key={index} 
                className={`aspect-square flex flex-col items-center justify-center ${
                  day ? 'bg-gray-100 dark:bg-gray-700 cursor-pointer' : ''
                } ${
                  day === today ? 'bg-green-100 dark:bg-green-900' : ''
                } rounded-lg ${
                  selectedDate && day === selectedDate.getDate() ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handleDateClick(day)}
              >
                <div className={day === today ? 'text-green-700 dark:text-green-300 font-bold' : ''}>{day}</div>
                <div className="flex mt-1">
                  {day && !isFutureDate && wateredDates.includes(new Date(year, month, day).toDateString()) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="#0284c7"
                    >
                      <path d="M12 0C8.8 5.3 6 8.7 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.3-2.8-6.7-6-12z" />
                    </svg>
                  )}
                  {day && !isFutureDate && floweringDates.includes(new Date(year, month, day).toDateString()) && (
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarMain;
