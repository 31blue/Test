import React from 'react';

function CalendarWatering({ wateredDates }) {
  const currentDate = new Date();
  if (!Array.isArray(wateredDates)) {
    wateredDates = [];
  }
  const lastWateredDate = wateredDates
    .map(item => {const date = new Date(item.checkDate);
          return {date, item}})
    .filter(({date}) => date <= currentDate)
    .sort((a, b) => b.date - a.date)
    .map(({date}) => date)[0];

  // console.log(lastWateredDate.toDateString())

  const getDaysSinceWatering = () => {
    if (!lastWateredDate) return null;
    const diffTime = Math.abs(currentDate - lastWateredDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysSinceWatering = getDaysSinceWatering();

  return (
    <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">물주기</h2>
      </header>
      <div className="p-3">
        {daysSinceWatering !== null ? (
          <div className="text-3xl font-bold text-sky-500 mb-1">
            D+{daysSinceWatering}
          </div>
        ) : (
          <div className="text-xl text-slate-500">
            물주기 기록이 없습니다.
          </div>
        )}
        <div className="text-sm text-slate-500">
          {lastWateredDate
            ? `마지막 물주기: ${lastWateredDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}`
            : '아직 물주기 기록이 없습니다.'}
        </div>
      </div>
    </div>
  );
}

export default CalendarWatering;