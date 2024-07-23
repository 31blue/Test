import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';

import DashboardCard12 from '../partials/message/DashboardCard12';

import Banner from '../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredDate, setFilteredDate] = useState(null);

  const handleDateChange = (dates) => {
    if (dates.length > 0) {
      setSelectedDate(dates);
    }
  };

  const handleAddView = () => {
    if (selectedDate && selectedDate.length === 2) {
      setFilteredDate(selectedDate);
    }
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">메세지</h1>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Card (Recent Activity) */}
              <DashboardCard12 filteredDate={filteredDate} />
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;
