import React, { useState } from 'react';

const initialNotifications = [
  { id: 1, date: '2024-07-22', message: '식물의 꽃이 피었습니다. - 개화 알림', active: true },
  { id: 2, date: '2024-07-22', message: '곤충이 발견되었습니다. - 병충해 알림', active: true },
  { id: 3, date: '2024-07-21', message: '건강검진을 할 때가 되었습니다. - 건강검진 알림', active: true },
  { id: 4, date: '2024-07-21', message: '방금 물주기를 하셨나요? - 물주기 알림', active: true },
  { id: 5, date: '2024-07-20', message: '식물의 꽃이 피었습니다. - 개화 알림', active: true },
  { id: 6, date: '2024-07-20', message: '곤충이 발견되었습니다. - 병충해 알림', active: true },
  { id: 7, date: '2024-07-19', message: '건강검진을 할 때가 되었습니다. - 건강검진 알림', active: true },
  { id: 8, date: '2024-07-19', message: '방금 물주기를 하셨나요? - 물주기 알림', active: true },
  { id: 9, date: '2024-07-18', message: '식물의 꽃이 피었습니다. - 개화 알림', active: true },
  { id: 10, date: '2024-07-18', message: '곤충이 발견되었습니다. - 병충해 알림', active: true },
  { id: 11, date: '2024-07-17', message: '건강검진을 할 때가 되었습니다. - 건강검진 알림', active: true },
  { id: 12, date: '2024-07-17', message: '방금 물주기를 하셨나요? - 물주기 알림', active: true },
  { id: 13, date: '2024-07-16', message: '식물의 꽃이 피었습니다. - 개화 알림', active: true },
  { id: 14, date: '2024-07-16', message: '곤충이 발견되었습니다. - 병충해 알림', active: true },
  { id: 15, date: '2024-07-15', message: '건강검진을 할 때가 되었습니다. - 건강검진 알림', active: true },
];

function DashboardCard12() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [visibleWeeks, setVisibleWeeks] = useState(1);

  const handleShowMore = () => {
    setVisibleWeeks(prev => prev + 1);
  };

  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {});

  const dates = Object.keys(groupedNotifications).sort((a, b) => new Date(b) - new Date(a));
  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  const visibleNotifications = weeks.slice(0, visibleWeeks).flat();

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { weekday: 'long' });
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">알림</h2>
      </header>
      <div className="p-3">
        {visibleNotifications.map(date => (
          <div key={date} className="mb-4 last:mb-0">
            <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 rounded-sm font-semibold p-2">
              {new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} ({getDayName(date)})
            </header>
            <ul className="mt-1">
              {groupedNotifications[date].map(notification => (
                <li key={notification.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div className="flex items-center justify-between py-2 px-2">
                    <div className="flex-grow pr-2 text-sm text-black dark:text-white">
                      {notification.message}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {visibleNotifications.length < dates.length ? (
          <div className="text-right">
            <button
              onClick={handleShowMore}
              className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-600 hover:bg-green-200"
            >
              더보기
            </button>
          </div>
        ) : (
          <div className="text-right text-xs text-gray-500 dark:text-gray-400 py-2">
            더보기가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard12;
