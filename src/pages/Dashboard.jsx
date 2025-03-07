import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import PlantProfile from '../partials/home_plantprofile/PlantProfile';
import PlantRegistration from '../partials/home_plantprofile/PlantRegistration';
import PlantSpecies from '../partials/home_plantprofile/PlantSpecies';
import PlantPhysical from '../partials/home_plantprofile/PlantPhysical';
import Banner from '../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 예시 데이터 (실제 사용 시 적절한 데이터로 교체)
  const plantData = {
    image: '/images/album/michael-benz--IZ2sgQKIhM-unsplash.jpg',
    name: '바질01', // 기본값을 '바질01'로 변경
    species: '바질 (Basil)',
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
            </div>
            
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <PlantProfile image={plantData.image} initialName={plantData.name} />
              <PlantSpecies species={plantData.species} />
              <PlantRegistration date={plantData.registrationDate} />
              <PlantPhysical
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