import React from 'react';

function GrowthChart() {
  const data = [
    { date: '7/26', value: 5.00 },
    { date: '7/27', value: 5.02 },
    { date: '7/28', value: 5.03 },
    { date: '7/29', value: 5.05 },
    { date: '7/30', value: 5.06 },
    { date: '7/31', value: 5.08 },
    { date: '8/1', value: 5.10 },
  ];

  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">성장 그래프 by 입면적 </h2>
      </header>
      <div className="p-3">
        <div className="grow">
          <svg viewBox="0 0 300 200" className="w-full h-64">
            {data.map((item, index) => {
              const barHeight = ((item.value - minValue) / (maxValue - minValue)) * 150;
              return (
                <g key={index} transform={`translate(${index * 40 + 30}, 0)`}>
                  <rect
                    y={180 - barHeight}
                    width="30"
                    height={barHeight}
                    fill="#10B981"
                    className="hover:fill-green-600 transition-colors duration-200"
                  />
                  <text x="15" y="195" textAnchor="middle" className="text-xs fill-gray-500">{item.date}</text>
                  <text x="15" y={175 - barHeight} textAnchor="middle" className="text-xs fill-gray-700">{item.value.toFixed(2)}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default GrowthChart;