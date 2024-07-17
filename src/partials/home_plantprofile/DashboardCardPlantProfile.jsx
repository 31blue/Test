import React from 'react';
import defaultImage from '../../images/album/michael-benz--IZ2sgQKIhM-unsplash.jpg';

function DashboardCardPlantProfile({ image, name }) {
  console.log('DashboardCardPlantProfile', { image, name });

  const [imgSrc, setImgSrc] = React.useState(image || defaultImage);

  const onError = () => {
    console.log('Image failed to load, using default image');
    setImgSrc(defaultImage);
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 mb-4 overflow-hidden rounded-full">
            <img 
              src={imgSrc} 
              alt={name} 
              className="w-full h-full object-cover" 
              onError={onError}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{name}</h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardCardPlantProfile;