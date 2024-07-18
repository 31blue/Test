import React, { useState } from 'react';

function DashboardCard02() {
  const [notifications, setNotifications] = useState({
    watering: false,
    flowering: false,
    healthCheck: false,
    pestControl: false,
    generalNotifications: false,
  });

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const NotificationToggle = ({ type, label }) => (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="hidden"
            checked={notifications[type]}
            onChange={() => toggleNotification(type)}
          />
          <div className={`toggle__line w-10 h-4 ${notifications[type] ? 'bg-green-400' : 'bg-gray-400'} rounded-full shadow-inner transition-colors duration-300 ease-in-out`}></div>
          <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-300 ease-in-out ${notifications[type] ? 'transform translate-x-full' : ''}`}></div>
        </div>
      </label>
    </div>
  );

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">개별 알림 설정</h2>
        <NotificationToggle type="watering" label="물주기 알림" />
        <NotificationToggle type="flowering" label="개화 알림" />
        <NotificationToggle type="healthCheck" label="건강검진 알림" />
        <NotificationToggle type="pestControl" label="병충해(곤충) 알림" />
        <NotificationToggle type="generalNotifications" label="일반 알림" />
      </div>
    </div>
  );
}

export default DashboardCard02;