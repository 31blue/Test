import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/settings_notification/DashboardCard01';
import DashboardCard02 from '../partials/settings_notification/DashboardCard02';

import Banner from '../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAllNotificationsOn, setIsAllNotificationsOn] = useState(false);
  const [notifications, setNotifications] = useState({
    watering: false,
    flowering: false,
    healthCheck: false,
    pestControl: false,
    generalNotifications: false,
  });

  const toggleAllNotifications = () => {
    const newState = !isAllNotificationsOn;
    setIsAllNotificationsOn(newState);
    setNotifications({
      watering: newState,
      flowering: newState,
      healthCheck: newState,
      pestControl: newState,
      generalNotifications: newState,
    });
  };

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
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
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">알림 설정</h1>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 
                isAllNotificationsOn={isAllNotificationsOn}
                toggleAllNotifications={toggleAllNotifications}
              />
              <DashboardCard02 
                notifications={notifications}
                toggleNotification={toggleNotification}
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
