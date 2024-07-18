import React, { useState } from 'react';

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
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">분석 결과 요약</h1>
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
    </div>
  );
}

export default Analysis_Summary;