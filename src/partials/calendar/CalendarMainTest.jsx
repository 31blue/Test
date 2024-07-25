import React, { useState, useEffect } from 'react';

function CalendarMainTest({ currentDate, wateredDates, floweringDates, onWatering, onFlowering }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayDate, setDisplayDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const [randomWateredDates, setRandomWateredDates] = useState([]);

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const calendarDays = Array(42).fill(null).map((_, index) => {
    const day = index - startingDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

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

  const isWatered = selectedDate && (wateredDates.includes(selectedDate.toDateString()) || randomWateredDates.includes(selectedDate.toDateString()));
  const isFlowering = selectedDate && floweringDates.includes(selectedDate.toDateString());

  const changeMonth = (increment) => {
    setDisplayDate(new Date(year, month + increment, 1));
  };

  const generateRandomDates = () => {
    const july2024 = new Date(2024, 6, 1);
    const randomDates = [];
    while (randomDates.length < 2) {
      const randomDay = Math.floor(Math.random() * 31) + 1;
      const randomDate = new Date(2024, 6, randomDay);
      if (randomDate.getMonth() === 6 && !randomDates.includes(randomDate.toDateString())) {
        randomDates.push(randomDate.toDateString());
      }
    }
    setRandomWateredDates(randomDates);
  };

  useEffect(() => {
    // 여기서 서버로부터 데이터를 받아올 수 있습니다.
    // 예를 들어, fetch('/api/watered-dates').then(res => res.json()).then(setRandomWateredDates);
  }, []);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => changeMonth(-1)} className="mr-4">{"<"}</button>
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            {`${year}년 ${months[month]}`}
          </h2>
          <button onClick={() => changeMonth(1)} className="ml-4">{">"}</button>
        </div>
        <div>
          <button
            className={`${isWatered ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded mr-2`}
            onClick={handleWatering}
            disabled={!selectedDate || selectedDate > currentDate}
          >
            {isWatered ? '물주기 취소' : '물주기'}
          </button>
          <button
            className={`${isFlowering ? 'bg-red-500 hover:bg-red-700' : 'bg-pink-500 hover:bg-pink-700'} text-white font-bold py-2 px-4 rounded mr-2`}
            onClick={handleFlowering}
            disabled={!selectedDate || selectedDate > currentDate}
          >
            {isFlowering ? '개화 취소' : '개화'}
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={generateRandomDates}
          >
            날짜 랜덤 생성
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
            const date = day ? new Date(year, month, day) : null;
            const isFutureDate = date && date > currentDate;
            const isToday = date && date.toDateString() === currentDate.toDateString();
            const isWateredDate = date && (wateredDates.includes(date.toDateString()) || randomWateredDates.includes(date.toDateString()));
            return (
              <div 
                key={index} 
                className={`aspect-square flex flex-col items-center justify-center ${
                  day ? 'bg-gray-100 dark:bg-gray-700 cursor-pointer' : ''
                } ${
                  isToday ? 'bg-green-100 dark:bg-green-900' : ''
                } rounded-lg ${
                  selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handleDateClick(day)}
              >
                <div className={isToday ? 'text-green-700 dark:text-green-300 font-bold' : ''}>{day}</div>
                <div className="flex mt-1">
                  {date && !isFutureDate && isWateredDate && (
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
                  {date && !isFutureDate && floweringDates.includes(date.toDateString()) && (
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

export default CalendarMainTest;