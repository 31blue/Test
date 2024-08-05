import React, { useState, useEffect } from 'react';

function SummaryEvaluation() {
  const [evaluationMessage, setEvaluationMessage] = useState("");

  const messages = [
    {
      text: "와우! 식물이 쑥쑥 자라고 있어요!<br/>당신의 정성이 통한 것 같아요!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      text: "식물이 잘 유지되고 있어요!<br/>조금만 더 신경 써주면 더 좋아질 거예요!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    },
    {
      text: "우리 식물이 조금 더 사랑이 필요해 보여요!<br/>함께 노력해 볼까요?",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setEvaluationMessage(messages[randomIndex]);
  }, []);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">식물 상태 평가</h2>
      </header>
      <div className="p-3">
        <div className="flex items-center space-x-4">
          {evaluationMessage.icon}
          <div className="text-lg font-medium text-gray-800 dark:text-gray-100">
            {/* `dangerouslySetInnerHTML`을 사용하여 문자열의 HTML 태그를 렌더링 */}
            <div dangerouslySetInnerHTML={{ __html: evaluationMessage.text }} />
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <br />
          식물 관리는 꾸준한 관심과 사랑이 필요해요. 
          <br />
          <br />
          GrowMate는 최근 일주일 간의 성장 그래프와 광합성량, 증발산량 그래프를 분석해서
          <br />
          현재 식물의 상태를 점검한 후 식물 집사님께 알려드립니다.
          <br />
          <br />
          매일 조금씩 신경 써주면 놀라운 변화가 있을 거예요!
          <br />
          함께 노력해서 우리 식물을 더 건강하고 아름답게 만들어 봐요!
        </div>
      </div>
    </div>
  );
}

export default SummaryEvaluation;
