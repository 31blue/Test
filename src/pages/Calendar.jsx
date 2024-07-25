import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import CalendarMain from '../partials/calendar/CalendarMain';
import CalendarMainTest from '../partials/calendar/CalendarMainTest';
import CalendarWatering from '../partials/calendar/CalendarWatering';
import CalendarFlower from '../partials/calendar/CalendarFlower';
import Banner from '../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [wateredDates, setWateredDates] = useState([]);
  const [floweringDates, setFloweringDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-semibold text-slate-800 mb-8">달력</h1>
            <div className="grid grid-cols-12 gap-6">
              <CalendarMainTest 
                currentDate={currentDate} 
                wateredDates={wateredDates}
                floweringDates={floweringDates}
                onWatering={handleWatering}
                onFlowering={handleFlowering}
              />
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