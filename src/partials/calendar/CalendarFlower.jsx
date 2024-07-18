import React from 'react';

function CalendarFlower({ floweringDates }) {
  const currentDate = new Date();
  const lastFloweringDate = floweringDates
    .map(dateString => new Date(dateString))
    .filter(date => date <= currentDate)
    .sort((a, b) => b - a)[0];

  const getDaysSinceFlowering = () => {
    if (!lastFloweringDate) return null;
    const diffTime = Math.abs(currentDate - lastFloweringDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysSinceFlowering = getDaysSinceFlowering();

  return (
    <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">개화</h2>
      </header>
      <div className="p-3">
        {daysSinceFlowering !== null ? (
          <div className="text-3xl font-bold text-pink-500 mb-1">
            D+{daysSinceFlowering}
          </div>
        ) : (
          <div className="text-xl text-slate-500">
            개화 기록이 없습니다.
          </div>
        )}
        <div className="text-sm text-slate-500">
          {lastFloweringDate
            ? `마지막 개화: ${lastFloweringDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}`
            : '아직 개화 기록이 없습니다.'}
        </div>
      </div>
    </div>
  );
}

export default CalendarFlower;