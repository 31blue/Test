import React from 'react';

const formatData = (data) => {
  if (Array.isArray(data)) {
    const extractedData = data.slice(0, 24);
    const formattedData = extractedData.map(value => Number(value.toFixed(4)));

    const result = formattedData.slice(0, 7);
    while (result.length < 7) {
      result.push(0);
    }

    return result.reverse();
  }
  return data;
};

const formatDayOnly = (index) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(date.getDate() - (6 - index));
  return `${date.getDate()}일`;
};

const formatFullDate = (index) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(date.getDate() - (6 - index));
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const getDateRange = (data) => {
  if (data.length === 0) return '';

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 6);
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - 1);

  return `${formatFullDate(0)} ~ ${formatFullDate(6)}`;
};

const WeeklyPhotosynthesis = ({ plantData }) => {
  const formattedData = formatData(plantData);
  const maxPhotosynthesis = 30; // Setting the maximum value of the y-axis to 30

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          일주일 광합성량
        </h2>
        <p className="mt-2 text-sm text-gray-500 italic text-right">
          {getDateRange(formattedData)}
        </p>
      </header>
      <div className="p-3">
        <svg width="100%" height="300" viewBox="0 0 800 300">
          <rect width="100%" height="100%" fill="white" />
          {formattedData.map((value, index) => (
            <rect
              key={index}
              x={(index * 100) + 50}
              y={300 - (value / maxPhotosynthesis) * 250 - 30}
              width="50"
              height={(value / maxPhotosynthesis) * 250}
              fill="#82ca9d"
            />
          ))}
          {formattedData.map((_, index) => (
            <text
              key={index}
              x={(index * 100) + 75}
              y="290"
              textAnchor="middle"
              fill="black"
            >
              {formatDayOnly(index)}
            </text>
          ))}
          <line x1="50" y1="270" x2="750" y2="270" stroke="black" />
          <line x1="50" y1="20" x2="50" y2="270" stroke="black" />
          {Array.from({ length: 6 }).map((_, i) => (
            <text
              key={i}
              x="40"
              y={270 - (i * 50)}
              textAnchor="end"
              alignmentBaseline="middle"
              fill="black"
            >
              {(i * 5).toFixed(0)}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default WeeklyPhotosynthesis;
