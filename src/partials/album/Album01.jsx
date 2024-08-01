import React, { useState, useEffect } from 'react';
import axios from 'axios';

// // formatDate 함수를 컴포넌트 외부로 이동
// const formatDate = (dateStr) => {
//   console.log(dateStr)
//   if (!dateStr) return '날짜 정보 없음';
//   const year = dateStr.slice(0, 4);
//   const month = dateStr.slice(4, 6);
//   const day = dateStr.slice(6, 8);
//   return `${year}년 ${month}월 ${day}일`;
// };

// ImageModal 컴포넌트
function ImageModal({ image, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="max-w-3xl max-h-full p-4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
        <img src={image.picture} alt={`사진 ${image.id}`} className="max-w-full max-h-[80vh] object-contain" />
        <div className="mt-4 text-center">
          <p className="text-gray-800">{image.date}</p>
          <button 
            onClick={onClose} 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function Album01() {
  const [images, setImages] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      const response = await axios.get("http://192.168.0.21:8000/get/pictures")
      const imageList = [];

      for (const image of response.data) {
        const { id, createAt, picture, filename } = image;
        const fileName = filename.split('/').pop();
        const date = createAt;
        const responsePicture = `data:image/jpeg;base64,${picture}`;
        
        imageList.push({
          name: fileName,
          id: id,
          date: date,
          picture: responsePicture
        });
      }
      setImages(imageList);
    };

    loadImages();
  }, []);

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 12);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const displayedImages = images.slice(0, displayCount);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">사진 보관함</h2>
      </header>
      <div className="p-3 grid grid-cols-3 gap-4">
        {displayedImages.map((image, index) => (
          <div 
            key={index} 
            className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center relative group cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <img src={image.picture} alt={`사진 ${image.id}`} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-center whitespace-pre-line">{image.date}</span>
            </div>
          </div>
        ))}
        {displayCount < images.length ? (
          <div 
            className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={handleShowMore}
          >
            <span className="text-gray-600 dark:text-gray-300">더보기</span>
          </div>
        ) : (
          images.length > 0 && (
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300">더보기가 없습니다.</span>
            </div>
          )
        )}
      </div>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Album01;
