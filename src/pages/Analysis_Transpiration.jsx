import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import TestAgain from '../partials/analysis_transpiration/TestAgain';
import DailyEvapotranspiration from '../partials/analysis_transpiration/DailyEvapotranspiration';
import TotalEvapotranspiration from '../partials/analysis_transpiration/TotalEvapotranspiration';
import WeeklyEvapotranspiration from '../partials/analysis_transpiration/WeeklyEvapotranspiration';
import DailyWaterIntake from '../partials/analysis_transpiration/DailyWaterIntake';

axios.defaults.baseURL = 'http://192.168.0.21:8000';
axios.defaults.withCredentials = true;

function Analysis_Evapotranspiration() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plantData, setPlantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/evapo/1', {
          withCredentials: true
        });
        setPlantData(response.data);
        setError(null);
      } catch (error) {
        setError("데이터 가져오기 실패");
        console.error("Error:", error);
      }
      setIsLoading(false);
    };
    fetchData();
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  증발산량 분석
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <TestAgain hour_avg_evapo={plantData.hour_avg_evapo} />
              <DailyEvapotranspiration hour_avg_evapo={plantData.hour_avg_evapo} />
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
