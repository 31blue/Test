import React, { useState, useRef, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';

import WeeklyPatterns from '../partials/analysis_summary/WeeklyPatterns';
import GrowthChart from '../partials/analysis_summary/GrowthChart';
import SummaryEvaluation from '../partials/analysis_summary/SummaryEvaluation';

import Banner from '../partials/Banner';

function Analysis_Summary() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    // 모달이 열려있을 때만 이벤트 리스너 추가
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 컴포넌트가 언마운트되거나 모달이 닫힐 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 flex items-center">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold flex items-center">
                  분석 결과 요약
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
              {/* Right: Actions */}
            </div>
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Sales Over Time) */}
              <WeeklyPatterns />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <GrowthChart />
              {/* Evaluation Card */}
              <SummaryEvaluation />
            </div>
          </div>
        </main>
        <Banner />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-8 rounded-lg max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">분석 결과 요약 페이지</h2>
            <p className="mb-4">
              이 페이지는 식물의 성장과 건강 상태를 종합적으로 분석하고 요약하는 곳입니다.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">주간 광합성량과 증발산량의 추이를 그래프로 보여줍니다. 이를 통해 식물의 생리활동 패턴을 파악할 수 있습니다.</li>
              <li className="mb-2">식물 성장 그래프를 통해 시간에 따른 식물의 키, 잎 수, 잎 면적 등의 변화를 확인할 수 있습니다.</li>
              <li className="mb-2">이러한 데이터를 기반으로 식물이 잘 자라고 있는지, 혹은 문제가 있는지를 평가합니다.</li>
            </ul>
            <p className="mb-4">
              이 정보들을 종합적으로 분석하여 식물의 전반적인 건강 상태와 성장 정도를 평가하고, 필요한 경우 개선을 위한 조언을 제공합니다.
            </p>
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

export default Analysis_Summary;