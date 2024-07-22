import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';

import CurrentTemperature from '../partials/home_now/CurrentTemperature';
import CurrentHumidity from '../partials/home_now/CurrentHumidity';

import Banner from '../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

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
                  실시간 온습도
                  <div className="relative">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      className="shrink-0 fill-current text-gray-400 ml-2 mb-1 cursor-pointer"
                      style={{ width: '0.8em', height: '0.8em' }}
                      onClick={toggleTooltip}
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    {showTooltip && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-600 z-10 text-justify">
                        실시간 온습도 정보입니다.<br /><br />
                        현재 온도와 습도는 실시간으로 업데이트됩니다.<br />
                        데이터는 매 2초마다 갱신됩니다.
                      </div>
                    )}
                  </div>
                </h1>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Real Time Value) */}
              <CurrentTemperature />
              {/* Doughnut chart (Top Countries) */}
              <CurrentHumidity />
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
