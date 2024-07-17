import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';

import DashboardCardPlantProfile from '../partials/home_plantprofile/DashboardCardPlantProfile';
import DashboardCardPlantSpecies from '../partials/home_plantprofile/DashboardCardPlantSpecies';
import DashboardCardPlantRegistration from '../partials/home_plantprofile/DashboardCardPlantRegistration';
import DashboardCardPlantPhysical from '../partials/home_plantprofile/DashboardCardPlantPhysical';

import Banner from '../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 예시 데이터 (실제 사용 시 적절한 데이터로 교체)
  const plantData = {
    image: '/images/album/michael-benz--IZ2sgQKIhM-unsplash.jpg',
    name: '몬스테라',
    species: 'Monstera deliciosa',
    registrationDate: '2023-07-15',
    height: '50cm',
    leafCount: 7,
    leafArea: '30cm²',
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">식물 프로필</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <Datepicker align="right" />
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                  <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add View</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCardPlantProfile image={plantData.image} name={plantData.name} />
              <DashboardCardPlantSpecies species={plantData.species} />
              <DashboardCardPlantRegistration date={plantData.registrationDate} />
              <DashboardCardPlantPhysical 
                name={plantData.name}
                height={plantData.height}
                leafCount={plantData.leafCount}
                leafArea={plantData.leafArea}
              />
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;