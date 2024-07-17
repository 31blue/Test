// C:\Users\user\tailwind-dashboard-template-main\src\partials\analysis_summary\SummaryEvaluation.jsx

import React, { useState } from 'react';

function SummaryEvaluation() {
  const [evaluationMessage, setEvaluationMessage] = useState("잘 자라고 있어요! 계속 이렇게 잘 자라길 바래요!");

  // Placeholder function to evaluate plant data trend
  const evaluatePlantData = (trend) => {
    if (trend === 'growing') {
      setEvaluationMessage("잘 자라고 있어요! 계속 이렇게 잘 자라길 바래요!");
    } else if (trend === 'steady') {
      setEvaluationMessage("유지 중이에요! 계속해서 관심을 기울여 주세요!");
    } else if (trend === 'declining') {
      setEvaluationMessage("관심이 필요해요! 더 많은 신경을 써 주세요!");
    }
  };

  // For demo purposes, let's assume the trend is 'growing'
  // In a real scenario, you would evaluate the actual plant data
  evaluatePlantData('growing');

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">평가</h2>
      </header>
      <div className="p-3">
        {/* Evaluation Message */}
        <div className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {evaluationMessage}
        </div>
      </div>
    </div>
  );
}

export default SummaryEvaluation;
