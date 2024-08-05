import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import PlantProfile from '../partials/home_plantprofile/PlantProfile';
import PlantRegistration from '../partials/home_plantprofile/PlantRegistration';
import PlantSpecies from '../partials/home_plantprofile/PlantSpecies';
import PlantPhysical from '../partials/home_plantprofile/PlantPhysical';
import Banner from '../partials/Banner';

axios.defaults.baseURL = 'http://192.168.0.21:8000';
axios.defaults.withCredentials = true;

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plantProfiles, setPlantProfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/', {
          withCredentials: true
        });
        console.log(response.data)
        setPlantProfiles(response.data);
        setActiveProfileId(response.data[0]?.id || null);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch plant data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updatePlantName = async (newName, id) => {
    setPlantProfiles(prevProfiles =>
      prevProfiles.map(profile =>
        profile.id === id ? { ...profile, plant_profile_name: newName } : profile
      )
    );

    try {
      await axios.put(`http://192.168.0.21:8000/update-profile/${id}`, { id, plant_profile_name: newName });
    } catch (error) {
      console.error('Failed to update name in database', error);
    }
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const activeProfile = plantProfiles.find(profile => profile.id === activeProfileId) || {
    id: null,
    plant_register: '',
    plant_profile_name: '기본 이름',
    plant_profile_photo: '',
    physical_properties: {}
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold flex items-center">
                  식물 프로필
                  <div className="relative">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      className="shrink-0 fill-current text-gray-400 ml-2 mb-1 cursor-pointer"
                      style={{ width: '0.8em', height: '0.8em' }}
                      onClick={toggleTooltip}
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    {showTooltip && (
                      <div className="absolute left-0 transform -translate-x-1/4 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-600 z-10">
                        <p className="mb-2">식물의 프로필 페이지입니다</p>
                        <br></br>
                        <ul className="list-disc list-inside mb-2">
                          <li>프로필 사진: 최신 촬영 이미지로 자동 갱신됩니다.</li>
                          <li>식물 이름: 사용자 지정 가능하며,
                            <ul className="list-circle list-inside ml-4 mt-1">
                              <li>최대 10자까지 입력 가능</li>
                              <li>한글, 영문자, 숫자만 사용 가능합니다.</li>
                            </ul>
                          </li>
                        </ul>
                        <p>물리적 특성 중 크기는 객체 인식 기술을 통해 자동으로 측정된 값입니다.</p>
                      </div>
                    )}
                  </div>
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <PlantProfile 
                plantData={activeProfile} 
                updatePlantName={updatePlantName} 
                id={activeProfile.id}
                profiles={plantProfiles}
                setActiveProfileId={setActiveProfileId}
              />
              <PlantSpecies />
              <PlantRegistration date={activeProfile.plant_register} />
              <PlantPhysical plantData={activeProfile} />
            </div>

            {isLoading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
