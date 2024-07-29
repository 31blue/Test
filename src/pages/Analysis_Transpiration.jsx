import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DailyEvapotranspiration from '../partials/analysis_transpiration/DailyEvapotranspiration';
import TotalEvapotranspiration from '../partials/analysis_transpiration/TotalEvapotranspiration';
import WeeklyEvapotranspiration from '../partials/analysis_transpiration/WeeklyEvapotranspiration';
import DailyWaterIntake from '../partials/analysis_transpiration/DailyWaterIntake';
import Banner from '../partials/Banner';

function Analysis_Evapotranspiration() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  
  const [waterIntakeAmount, setWaterIntakeAmount] = useState(1);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold flex items-center">
                  증발산량 분석
                  <div className="relative">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      className="shrink-0 fill-current text-gray-400 ml-2 mb-1 cursor-pointer"
                      style={{ width: '0.8em', height: '0.8em' }}
                      onClick={toggleModal}
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                  </div>
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <DailyEvapotranspiration />
              <TotalEvapotranspiration />
              <WeeklyEvapotranspiration />
              <DailyWaterIntake waterAmount={waterIntakeAmount} />
            </div>
          </div>
        </main>
        <Banner />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-8 rounded-lg max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">증발산량 분석 페이지</h2>
            <p className="mb-4">
              증발산량은 식물의 활동량을 측정하는 데 있어 매우 중요한 지표입니다. 이 페이지는 식물의 증발산 활동을 다양한 관점에서 분석하고 시각화합니다.
            </p>
            <p className="mb-4">
              증발산량이 식물 활동량 측정에 중요한 이유:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">
                <strong>생리적 활동 지표:</strong> 증발산은 식물의 기공 활동과 직접적으로 연관되어 있어, 식물의 전반적인 생리적 활동을 반영합니다.
              </li>
              <li className="mb-2">
                <strong>생장률 예측:</strong> 증발산량은 식물의 생장률과 밀접한 관계가 있어, 향후 생장을 예측하는 데 도움이 됩니다.
              </li>
            </ul>
            <p className="mb-4">
              이 페이지에서는 다음과 같은 정보를 제공합니다:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">
                <strong>주간 총 증발산량:</strong> 일주일 동안의 총 증발산량을 보여주는 대시보드입니다.
              </li>
              <li className="mb-2">
                <strong>주간 일별 증발산량 추이:</strong> 일주일 동안의 일별 증발산량 변화를 보여주는 그래프입니다.
              </li>
              <li className="mb-2">
                <strong>일일 평균 수분 섭취량:</strong> 일주일의 데이터를 평균 내어 하루 평균 수분 섭취량을 보여주는 대시보드입니다.
              </li>
            </ul>
            <button 
              onClick={toggleModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analysis_Evapotranspiration;