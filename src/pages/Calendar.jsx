import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import CalendarMain from '../partials/calendar/CalendarMain';
import CalendarWatering from '../partials/calendar/CalendarWatering';
import CalendarFlower from '../partials/calendar/CalendarFlower';
import Banner from '../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [wateredDates, setWateredDates] = useState([]);
  const [floweringDates, setFloweringDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWatering = (date) => {
    const dateString = date.toDateString();
    if (wateredDates.includes(dateString)) {
      setWateredDates(wateredDates.filter(d => d !== dateString));
    } else {
      setWateredDates([...wateredDates, dateString]);
    }
  };

  const handleFlowering = (date) => {
    const dateString = date.toDateString();
    if (floweringDates.includes(dateString)) {
      setFloweringDates(floweringDates.filter(d => d !== dateString));
    } else {
      setFloweringDates([...floweringDates, dateString]);
    }
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center">
              달력
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
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-600 z-10 text-justify">
                    이 달력에서는 물주기와 개화를 수동 버튼으로 관리할 수 있습니다. 또한, 마지막으로 물을 준 날짜와 개화한 날짜로부터 얼마나 시간이 지났는지를 디데이로 계산하여 보여줍니다.
                  </div>
                )}
              </div>
            </h1>
            <div className="grid grid-cols-12 gap-6">
              <CalendarMain 
                currentDate={currentDate} 
                wateredDates={wateredDates}
                floweringDates={floweringDates}
                onWatering={handleWatering}
                onFlowering={handleFlowering}
              />
              <CalendarWatering wateredDates={wateredDates} />
              <CalendarFlower floweringDates={floweringDates} />
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;