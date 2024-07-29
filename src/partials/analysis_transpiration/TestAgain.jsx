import React from 'react';

function TestAgain({ hour_avg_evapo }) {
  const processData = (data) => {
    if (!data) return [];
    
    return data.slice(0, 24).map(value => {
      const rounded = Math.round((value + 10) * 1000) / 1000;
      return rounded.toFixed(3);
    });
  };

  const processedData = processData(hour_avg_evapo);

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          처리된 최신 24개 데이터 값
        </h2>
      </header>
      <div className="p-3">
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
          {processedData.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TestAgain;