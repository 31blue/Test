// src/contexts/NotificationContext.jsx
import React, { createContext, useState, useContext } from 'react';

// NotificationContext를 생성합니다.
const NotificationContext = createContext();

// NotificationProvider를 정의합니다.
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, date: '2024-07-22', message: '식물의 꽃이 피었습니다.', active: true },
    { id: 2, date: '2024-07-22', message: '곤충이 발견되었습니다.', active: true },
    { id: 3, date: '2024-07-21', message: '건강검진을 할 때가 되었습니다.', active: true },
    { id: 4, date: '2024-07-21', message: '방금 물주기를 하셨나요?', active: true },
  ]);

  // 알림 상태를 토글하는 함수입니다.
  const toggleNotification = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, active: !n.active } : n
    ));
  };

  // Context의 값을 제공합니다.
  return (
    <NotificationContext.Provider value={{ notifications, toggleNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// useNotifications 훅을 정의하여 Context를 쉽게 사용할 수 있도록 합니다.
export const useNotifications = () => useContext(NotificationContext);
