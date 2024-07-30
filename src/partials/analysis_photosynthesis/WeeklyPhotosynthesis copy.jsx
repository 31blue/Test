import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// 날짜 생성 함수
const generateWeeklyData = () => {
  const today = new Date();
  const data = [];
  for (let i = 7; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      day: date.toISOString().split('T')[0],
      photosynthesis: Math.floor(Math.random() * 100) + 100 // 랜덤 데이터 생성
    });
  }
  return data;
};

const weeklyData = generateWeeklyData();

// 그래프용 날짜 포맷 함수 (일만 표시)
const formatDayOnly = (dateStr) => {
  const [, , day] = dateStr.split('-');
  return `${parseInt(day, 10)}일`;
};

// 전체 날짜 포맷 함수
const formatFullDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
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
              tickFormatter={(tick) => formatDayOnly(tick)}
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