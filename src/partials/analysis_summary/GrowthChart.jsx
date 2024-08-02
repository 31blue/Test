import React from 'react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

// 오늘 날짜를 제외한 가장 최근 7일의 날짜를 계산
const today = new Date();
const dates = eachDayOfInterval({
  start: subDays(today, 7),
  end: subDays(today, 1)
});

// 각 날짜를 포맷하여 표시할 수 있게 준비
const formattedDates = dates.map(date => format(date, 'd일'));

const data = [
  { value: 5.00 },
  { value: 5.05 },
  { value: 5.10 },
  { value: 5.12 },
  { value: 5.08 },
  { value: 5.15 },
  { value: 5.20 },
];

function GrowthChart() {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));

  // 각 데이터 항목과 x축 레이블의 위치를 조정하여 넓게 배치
  const barWidth = 50;
  const spacing = 60;

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">성장 그래프 by 입면적</h2>
      </header>
      <div className="p-3">
        <div className="grow">
          <svg viewBox={`0 0 ${data.length * spacing + 60} 200`} className="w-full h-64">
            {data.map((item, index) => {
              const barHeight = ((item.value - minValue) / (maxValue - minValue)) * 150;
              return (
                <g key={index} transform={`translate(${index * spacing + 30}, 0)`}>
                  <rect
                    y={180 - barHeight}
                    width={barWidth}
                    height={barHeight}
                    fill="#10B981"
                    className="hover:fill-green-600 transition-colors duration-200"
                  />
                  <text x={barWidth / 2} y={175 - barHeight} textAnchor="middle" className="text-xs fill-gray-700">
                    {item.value.toFixed(2)}
                  </text>
                </g>
              );
            })}
            {/* x축 레이블 추가 */}
            <g transform="translate(0, 180)">
              {formattedDates.map((date, index) => (
                <text key={index} x={index * spacing + 30 + barWidth / 2} y="15" textAnchor="middle" className="text-xs fill-gray-500">
                  {date}
                </text>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default GrowthChart;
