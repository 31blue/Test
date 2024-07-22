import React, { useState } from 'react';

const initialNotifications = [
  { id: 1, date: '2024-07-22', message: '식물의 꽃이 피었습니다. - 개화 알림', active: true },
  { id: 2, date: '2024-07-22', message: '곤충이 발견되었습니다. - 병충해 알림', active: true },
  { id: 3, date: '2024-07-21', message: '건강검진을 할 때가 되었습니다. - 건강검진 알림', active: true },
  { id: 4, date: '2024-07-21', message: '방금 물주기를 하셨나요? - 물주기 알림', active: true },
];

function DashboardCard12() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleNotification = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, active: !n.active } : n
    ));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const removeAllNotifications = () => {
    setNotifications([]);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, active: false })));
  };

  const restoreAllNotifications = () => {
    setNotifications(initialNotifications);
  };

  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {});

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">알림</h2>
        <div>
          <button
            onClick={restoreAllNotifications}
            className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-600 hover:bg-green-200 mr-2"
          >
            복구하기
          </button>
          <button
            onClick={removeAllNotifications}
            className="text-xs font-medium px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 mr-2"
          >
            모두 삭제하기
          </button>
          <button
            onClick={markAllAsRead}
            className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            모두 확인하기
          </button>
        </div>
      </header>
      <div className="p-3">
        {Object.entries(groupedNotifications).map(([date, notifs]) => (
          notifs.length > 0 && (
            <div key={date} className="mb-4 last:mb-0">
              <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 rounded-sm font-semibold p-2">
                {new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </header>
              <ul className="mt-1">
                {notifs.map(notification => (
                  <li key={notification.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <div className="flex items-center justify-between py-2 px-2">
                      <div className={`flex-grow pr-2 text-sm ${notification.active ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                        {notification.message}
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleNotification(notification.id)}
                          className={`text-xs font-medium px-2 py-1 rounded mr-2 ${
                            notification.active 
                              ? 'bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-400' 
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          } ${
                            notification.active 
                              ? 'hover:bg-violet-100 hover:text-violet-600 dark:hover:bg-violet-700 dark:hover:text-violet-400' 
                              : 'hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-gray-300'
                          } transition-colors duration-150`}
                        >
                          {notification.active ? '확인 전' : '확인 완료'}
                        </button>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
        {notifications.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">알림이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default DashboardCard12;
