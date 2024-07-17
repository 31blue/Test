function DailyOxygen({ oxygenAmount = 1 }) {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-green-100 dark:bg-green-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">하루 총 산소 생성량</h2>
      </header>
      <div className="p-3">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{oxygenAmount} 단위</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
            매일 평균 <span className="font-semibold">{oxygenAmount}</span> 만큼의 산소를 생성합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyOxygen;