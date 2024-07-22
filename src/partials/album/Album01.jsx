import React, { useState, useEffect } from 'react';

function Album01() {
  const [images, setImages] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    const loadImages = async () => {
      const imageModules = import.meta.glob('../../images/test/*.png');
      const imageList = [];

      for (const path in imageModules) {
        const mod = await imageModules[path]();
        const fileName = path.split('/').pop();
        const [id, dateStr] = fileName.split('_');
        const date = dateStr ? dateStr.split('.')[0] : null; // 날짜 문자열 추출
        
        imageList.push({
          src: mod.default,
          name: fileName,
          id: id,
          date: date
        });
      }

      setImages(imageList.sort((a, b) => a.id.localeCompare(b.id)));
    };

    loadImages();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '날짜 정보 없음';
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}년\n${month}월 ${day}일`;
  };

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 12);
  };

  const displayedImages = images.slice(0, displayCount);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">일반 앨범</h2>
      </header>
      <div className="p-3 grid grid-cols-3 gap-4">
        {displayedImages.map((image, index) => (
          <div key={index} className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center relative group">
            <img src={image.src} alt={`사진 ${image.id}`} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-center whitespace-pre-line">{formatDate(image.date)}</span>
            </div>
          </div>
        ))}
        <div 
          className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={handleShowMore}
        >
          <span className="text-gray-600 dark:text-gray-300">더보기</span>
        </div>
      </div>
    </div>
  );
}

export default Album01;