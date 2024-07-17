import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DailyEvapotranspiration from '../partials/analysis_transpiration/DailyEvapotranspiration';
import TotalEvapotranspiration from '../partials/analysis_transpiration/TotalEvapotranspiration';
import WeeklyEvapotranspiration from '../partials/analysis_transpiration/WeeklyEvapotranspiration';
import DailyWaterIntake from '../partials/analysis_transpiration/DailyWaterIntake';
import Banner from '../partials/Banner';

function Analysis_Evapotranspiration() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 물 섭취량을 위한 상태 변수 (필요에 따라 API나 다른 소스에서 가져올 수 있습니다)
  const [waterIntakeAmount, setWaterIntakeAmount] = useState(1);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">증발산량 분석</h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <Datepicker align="right" />
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
    </div>
  );
}

export default Analysis_Evapotranspiration;