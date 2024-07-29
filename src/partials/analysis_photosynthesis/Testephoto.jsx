import React from 'react';

function Testephoto({ plantData, isLoading, error }) {
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">원본 데이터</h2>
      </header>
      <div className="p-3">
        <pre className="whitespace-pre-wrap break-words text-sm text-gray-600 dark:text-gray-400">
          {JSON.stringify(plantData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Testephoto;