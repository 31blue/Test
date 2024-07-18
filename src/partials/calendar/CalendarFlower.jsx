// src/partials/album/DashboardCardAlbum.jsx
import React from 'react';

import img1 from '../../images/album/60048_57590_3014.jpg';
import img2 from '../../images/album/chris-barbalis-oOBMoCOgGrY-unsplash.jpg';
import img3 from '../../images/album/creative-christians-v5kSQq-6HZQ-unsplash.jpg';

const images = [
  img1,
  img2,
  img3,
  // 필요한 경우, 더 많은 이미지를 추가할 수 있습니다.
];

function CalendarFlower({ startIndex }) {
  const displayedImages = images.slice(startIndex, startIndex + 4);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">개화</h2>
      </header>
      <div className="p-3 grid grid-cols-2 gap-4">
        {/* 앨범 사진들 */}
        {displayedImages.map((image, index) => (
          <div key={index} className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
            <img src={image} alt={`사진 ${startIndex + index + 1}`} className="w-full h-full object-cover"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarFlower;
