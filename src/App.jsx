import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages'; // Messages.jsx 파일 가져오기
import Home_PlantProfile from './pages/Home_PlantProfile';
import Home_Now from './pages/Home_Now';
import Analysis_Summary from './pages/Analysis_Summary';
import Analysis_Photosynthesis from './pages/Analysis_Photosynthesis'; 
import Analysis_Transpiration from './pages/Analysis_Transpiration';
import Calendar from './pages/Calendar';
import Album from './pages/Album';
import Settings_User from './pages/Settings_User';
import Settings_Notification from './pages/Settings_Notification';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home_PlantProfile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/home_plantprofile" element={<Home_PlantProfile />} />
        <Route path="/home_now" element={<Home_Now />} />
        <Route path="/analysis_summary" element={<Analysis_Summary />} />
        <Route path="/analysis_photosynthesis" element={<Analysis_Photosynthesis />} />
        <Route path="/analysis_transpiration" element={<Analysis_Transpiration />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/album" element={<Album />} />
        <Route path="/settings_user" element={<Settings_User />} />
        <Route path="/settings_notification" element={<Settings_Notification />} />
      </Routes>
    </>
  );
}

export default App;
