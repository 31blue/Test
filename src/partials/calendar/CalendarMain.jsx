import React, { useState, useRef, useEffect } from 'react';

function CalendarMain({ currentDate, wateredDates, floweringDates, onWatering, onFlowering }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayDate, setDisplayDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const calendarRef = useRef(null);

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

  const isWatered = selectedDate && wateredDates.includes(selectedDate.toDateString());
  const isFlowering = selectedDate && floweringDates.includes(selectedDate.toDateString());

  const changeMonth = (increment) => {
    setDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  // 슬라이드 기능
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50; // 슬라이드로 인식할 최소 거리
    if (touchStartX - touchEndX > swipeThreshold) {
      // 왼쪽으로 슬라이드
      changeMonth(1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // 오른쪽으로 슬라이드
      changeMonth(-1);
    }
  };

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      calendar.addEventListener('touchstart', handleTouchStart, false);
      calendar.addEventListener('touchend', handleTouchEnd, false);
    }

    return () => {
      if (calendar) {
        calendar.removeEventListener('touchstart', handleTouchStart);
        calendar.removeEventListener('touchend', handleTouchEnd);
      }
    };
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
            className={`${isFlowering ? 'bg-red-500 hover:bg-red-700' : 'bg-pink-500 hover:bg-pink-700'} text-white font-bold py-2 px-4 rounded`}
            onClick={handleFlowering}
            disabled={!selectedDate || selectedDate > currentDate}
          >
            {isFlowering ? '개화 취소' : '개화'}
          </button>
        </div>
      </header>
      <div className="p-3" ref={calendarRef}>
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
                  {date && !isFutureDate && wateredDates.includes(date.toDateString()) && (
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

export default CalendarMain;
