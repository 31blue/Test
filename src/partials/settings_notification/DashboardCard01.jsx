import React, { useState } from 'react';

function DashboardCard01() {
  const [isAllNotificationsOn, setIsAllNotificationsOn] = useState(false);

  const toggleNotifications = () => {
    setIsAllNotificationsOn(!isAllNotificationsOn);
  };

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">전체 알림 설정</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">알림 {isAllNotificationsOn ? '켜기' : '끄기'}</span>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="hidden"
                checked={isAllNotificationsOn}
                onChange={toggleNotifications}
              />
              <div className={`toggle__line w-10 h-4 ${isAllNotificationsOn ? 'bg-green-400' : 'bg-gray-400'} rounded-full shadow-inner transition-colors duration-300 ease-in-out`}></div>
              <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-300 ease-in-out ${isAllNotificationsOn ? 'transform translate-x-full' : ''}`}></div>
            </div>
          </label>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {isAllNotificationsOn
            ? '전체 알림을 켰습니다.'
            : '전체 알림이 꺼져 있습니다.'}
        </p>
      </div>
    </div>
  );
}

export default DashboardCard01;