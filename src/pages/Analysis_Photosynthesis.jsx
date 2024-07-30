import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DailyPhotosynthesis from '../partials/analysis_photosynthesis/DailyPhotosynthesis';
import TotalPhotosynthesis from '../partials/analysis_photosynthesis/TotalPhotosynthesis';
import WeeklyPhotosynthesis from '../partials/analysis_photosynthesis/WeeklyPhotosynthesis';
import DailyOxygen from '../partials/analysis_photosynthesis/DailyOxygen';
import Banner from '../partials/Banner';

axios.defaults.baseURL = 'http://192.168.0.21:8000';
axios.defaults.withCredentials = true;

function Analysis_Photosynthesis() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plantData, setPlantData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get('/photo/3');
        setPlantData(data);
        setError(null);
      } catch (error) {
        setError("데이터 가져오기 실패");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0 flex items-center">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold flex items-center">
                  광합성량 분석
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
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {/* Ensure components only render if plantData is available */}
              {plantData && (
                <>
                  <DailyPhotosynthesis plantData={plantData.hour_avg_photo} />
                  <WeeklyPhotosynthesis plantData={plantData.day_avg_photo} />
                  <TotalPhotosynthesis 
                    day_avg_photo={plantData.day_avg_photo} 
                    week_avg_O2={plantData.week_avg_O2}
                  />
                  <DailyOxygen 
                    day_avg_photo={plantData.day_avg_photo} 
                    week_avg_O2={plantData.week_avg_O2}
                  />
                </>
              )}
            </div>
          </div>
        </main>
        <Banner />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-8 rounded-lg max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">광합성량 분석 페이지</h2>
            <p className="mb-4">
              이 페이지는 식물의 광합성 활동을 다양한 관점에서 분석하고 시각화합니다.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">
                <strong>일일 광합성량 추이:</strong> 하루 동안의 광합성량 변화를 보여주는 그래프입니다.
              </li>
              <li className="mb-2">
                <strong>주간 총 광합성량 및 산소량:</strong> 일주일 동안의 총 광합성량과 생성된 총 산소량을 보여주는 대시보드입니다.
              </li>
              <li className="mb-2">
                <strong>주간 일별 광합성량 추이:</strong> 일주일 동안의 일별 광합성량 변화를 보여주는 그래프입니다.
              </li>
              <li className="mb-2">
                <strong>일일 평균 산소 방출량:</strong> 일주일의 데이터를 평균 내어 하루 평균 산소 방출량을 보여주는 대시보드입니다.
              </li>
            </ul>
            <p className="mb-4">
              이 정보들을 통해 식물의 광합성 활동을 종합적으로 분석하고, 식물의 건강 상태와 생장 환경의 적합성을 평가할 수 있습니다.
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

export default Analysis_Photosynthesis;