import React, { useState, useEffect } from 'react';
import defaultImage from '../../images/album/michael-benz--IZ2sgQKIhM-unsplash.jpg';

function PlantProfile({ image, initialName = '바질01', registrationDate }) {
  const [imgSrc, setImgSrc] = useState(image || defaultImage);
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [dDay, setDDay] = useState(0);

  useEffect(() => {
    const calculateDDay = () => {
      const today = new Date();
      const regDate = new Date(registrationDate);
      const diffTime = Math.abs(today - regDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDDay(diffDays);
    };

    if (registrationDate) {
      calculateDDay();
    }
  }, [registrationDate]);

  const onError = () => {
    console.log('Image failed to load, using default image');
    setImgSrc(defaultImage);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 mb-4 overflow-hidden rounded-full relative group">
            <img 
              src={imgSrc} 
              alt={name} 
              className="w-full h-full object-cover" 
              onError={onError}
            />
            {registrationDate && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-black font-bold text-lg">D+{dDay}</span>
              </div>
            )}
          </div>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2"
              autoFocus
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{name}</h1>
          )}
          <button
            onClick={toggleEdit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isEditing ? '저장' : '이름 수정'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlantProfile;
