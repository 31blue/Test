import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import PlantProfile from '../partials/home_plantprofile/PlantProfile';
import PlantRegistration from '../partials/home_plantprofile/PlantRegistration';
import PlantSpecies from '../partials/home_plantprofile/PlantSpecies';
import PlantPhysical from '../partials/home_plantprofile/PlantPhysical';
import Banner from '../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plantData, setPlantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.21:8000/');
        setPlantData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch plant data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updatePlantName = (newName) => {
    setPlantData(prevData => ({
      ...prevData,
      plant_profile_name: newName
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  식물 프로필
                </h1>
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              {plantData && (
                <PlantProfile plantData={plantData} updatePlantName={updatePlantName} />
              )}
              <PlantSpecies />
              {plantData && (
                <PlantRegistration date={plantData.plant_register} />
              )}
              {plantData && (
                <PlantPhysical plantData={plantData} />
              )}
            </div>
          </div>
        </main>
        
        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;