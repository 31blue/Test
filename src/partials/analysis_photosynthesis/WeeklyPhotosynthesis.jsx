import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { day: '2024-07-17', photosynthesis: 120 },
  { day: '2024-07-18', photosynthesis: 150 },
  { day: '2024-07-19', photosynthesis: 130 },
  { day: '2024-07-20', photosynthesis: 170 },
  { day: '2024-07-21', photosynthesis: 160 },
  { day: '2024-07-22', photosynthesis: 140 },
  { day: '2024-07-23', photosynthesis: 180 },
];

// 그래프용 날짜 포맷 함수 (일만 표시)
const formatDayOnly = (dateStr) => {
  const [, , day] = dateStr.split('-');
  return `${parseInt(day, 10)}일`;
};

// 전체 날짜 포맷 함수
const formatFullDate = (dateStr) => {
  return dateStr;
};

// 날짜 범위 계산 함수
const getDateRange = (data) => {
  if (data.length === 0) return '';

  const startDate = data[0].day;
  const endDate = data[data.length - 1].day;
  return `${formatFullDate(startDate)} ~ ${formatFullDate(endDate)}`;
};

function WeeklyPhotosynthesis() {
  const dateRange = getDateRange(weeklyData);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          일주일 광합성량
        </h2>
        <p className="mt-2 text-sm text-gray-500 italic text-right">
          {dateRange}
        </p>
      </header>
      <div className="p-3">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              tickFormatter={(tick) => formatDayOnly(tick)} // 날짜를 일(day)만 표시
            />
            <YAxis />
            <Tooltip labelFormatter={(label) => formatFullDate(label)} />
            <Bar dataKey="photosynthesis" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyPhotosynthesis;