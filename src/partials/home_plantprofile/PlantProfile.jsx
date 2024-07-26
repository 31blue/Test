import React, { useState, useEffect } from 'react';
import defaultImage from '../../images/album/michael-benz--IZ2sgQKIhM-unsplash.jpg';

function PlantProfile({ plantData, updatePlantName }) {
  const [imgSrc, setImgSrc] = useState(defaultImage);
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [dDay, setDDay] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeAccount, setActiveAccount] = useState(null);

  useEffect(() => {
    if (plantData) {
      const { id, plant_register, plant_profile_name, plant_profile_photo } = plantData;
      setImgSrc(plant_profile_photo || defaultImage);
      setName(plant_profile_name || '바질01');
      setActiveAccount(id);

      if (plant_register) {
        const today = new Date();
        const regDate = new Date(plant_register);
        const diffTime = Math.abs(today - regDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDDay(diffDays);
      }
    }
  }, [plantData]);

  const onError = () => {
    console.log('Image failed to load, using default image');
    setImgSrc(defaultImage);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (newName.length > 10) {
      setErrorMessage('이름은 10자리 이하만 가능합니다.');
      return;
    }
    if (!/^[가-힣a-zA-Z0-9]+$/.test(newName)) {
      setErrorMessage('한글, 영어, 숫자만 사용할 수 있습니다.');
      return;
    }
    setName(newName);
    setErrorMessage('');
  };

  const toggleEdit = () => {
    if (isEditing) {
      if (name.length === 0) {
        setErrorMessage('이름을 입력해주세요.');
        return;
      }
      updatePlantName(name);
    }
    setIsEditing(!isEditing);
    setErrorMessage('');
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 mb-6 overflow-hidden rounded-full relative group shadow-lg">
            <img 
              src={imgSrc} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              onError={onError}
            />
            {plantData && plantData.plant_register && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-bold text-lg">D+{dDay}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center space-y-2 mb-4 w-full">
            <div className="flex items-center space-x-4 w-full justify-center">
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center bg-transparent border-b-2 border-green-500 focus:outline-none focus:border-green-600 w-4/5"
                  autoFocus
                  maxLength={10}
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{name}</h1>
              )}
              <button
                onClick={toggleEdit}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap w-16 ${
                  isEditing 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'text-green-500 border border-green-500 hover:bg-green-50 dark:hover:bg-gray-700'
                }`}
              >
                {isEditing ? '저장' : '수정'}
              </button>
            </div>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3].map((id) => (
                <button
                  key={id}
                  className={`px-4 py-2 rounded-full ${
                    activeAccount === id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  } ${!plantData && 'opacity-50 cursor-not-allowed'}`}
                  disabled={!plantData}
                >
                  계정 {id}
                </button>
              ))}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlantProfile;