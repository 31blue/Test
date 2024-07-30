import React, { useState } from 'react';

function PlantSpecies() {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">종</h2>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100">바질 (Basil)</p>
          {!showDetails && (
            <button
              onClick={toggleDetails}
              className="text-sm font-medium text-green-500 hover:text-green-600"
            >
              자세히
            </button>
          )}
        </div>
        
        {showDetails && (
          <div className="relative">
            <div className="mt-4 h-[500px] overflow-y-auto pr-4">
              <p className="text-gray-800 dark:text-gray-100 mb-4">
                바질은 꿀풀과에 속하는 향신료 식물로, 요리와 약용으로 널리 사용됩니다. 바질은 따뜻한 기후에서 잘 자라며, 강한 햇빛과 적절한 물 공급이 필요합니다.
              </p>
              <table className="w-full text-left text-sm text-gray-800 dark:text-gray-100 mb-4">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2">특성</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">학명</td>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">Ocimum basilicum</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">원산지</td>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">인도, 아시아</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">성장 높이</td>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">30-60 cm</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">햇빛 요구량</td>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">직사광선</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">물 주기</td>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">주 1-2회, 토양이 건조할 때</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">토양</td>
                    <td className="border-b border-gray-300 dark:border-gray-700 py-2">배수성이 좋은 토양</td>
                  </tr>
                </tbody>
              </table>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">바질 재배 방법</h3>
              <p className="text-gray-800 dark:text-gray-100 mb-4">
                바질을 재배하려면 다음과 같은 조건을 충족해야 합니다:
              </p>
              <ul className="list-disc list-inside text-gray-800 dark:text-gray-100 mb-4">
                <li>햇빛: 바질은 하루에 최소 6시간 이상의 직사광선을 필요로 합니다. 실내에서 재배할 경우, 남향 창가에 두는 것이 좋습니다.</li>
                <li>물 주기: 토양이 건조해지면 물을 주되, 과도한 물 주기는 피해야 합니다. 배수구가 있는 화분을 사용하여 물빠짐이 잘 되도록 합니다.</li>
                <li>토양: 배수성이 좋은 토양을 사용합니다. 일반적인 화분용 흙에 펄라이트나 모래를 섞어 배수성을 높일 수 있습니다.</li>
                <li>온도: 바질은 따뜻한 기후를 좋아하며, 최적의 성장 온도는 20-30°C입니다. 추운 날씨에는 실내에서 재배하는 것이 좋습니다.</li>
                <li>비료: 성장기에는 2주에 한 번씩 액체 비료를 주는 것이 좋습니다. 유기농 비료를 사용하는 것이 바람직합니다.</li>
                <li>수확: 바질은 잎이 충분히 자라면 수확할 수 있습니다. 잎을 자를 때는 줄기 끝에서부터 자르면 새로운 잎이 더 잘 자랍니다.</li>
              </ul>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-2 flex justify-end">
              <button
                onClick={toggleDetails}
                className="text-sm font-medium text-green-500 hover:text-green-600"
              >
                설명 접기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlantSpecies;