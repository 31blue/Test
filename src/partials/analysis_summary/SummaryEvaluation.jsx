import React, { useState, useEffect } from 'react';

function SummaryEvaluation() {
  const [evaluationMessage, setEvaluationMessage] = useState("");

  const messages = [
    "잘 자라고 있어요! 계속 이렇게 잘 자라길 바래요!",
    "유지 중이에요! 계속해서 관심을 기울여 주세요!",
    "관심이 필요해요! 더 많은 신경을 써 주세요!"
  ];

  //잘 자라고 있다는 말을 기본값으로 넣고 싶었는데 오류가 나길래 일단은 랜덤으로 해놓음. 고칠 예정.

  useEffect(() => {
    // 컴포넌트가 마운트될 때 랜덤 메시지 선택
    const randomIndex = Math.floor(Math.random() * messages.length);
    setEvaluationMessage(messages[randomIndex]);
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행되도록 함

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