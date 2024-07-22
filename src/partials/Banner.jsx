import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(!localStorage.getItem('bannerClosed'));
  const [randomMessage, setRandomMessage] = useState('');
  const [viewedMessages, setViewedMessages] = useState([]);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const messages = [
    { text: "식물의 현재 활동량을 체크해 보시겠어요?", link: "/analysis_summary" },
    { text: "어떤 사진이 저장되어 있는지 확인해 보세요.", link: "/album" },
    { text: "오늘의 대기 온습도를 확인해 보시겠어요?", link: "/home_now" },
    { text: "식물의 광합성량을 확인해 보세요.", link: "/analysis_photosynthesis" },
    { text: "이번 달 개화 기록을 확인해 보시겠어요?", link: "/calendar" }
  ];

  useEffect(() => {
    if (bannerOpen) {
      showRandomMessage();
    }
  }, [bannerOpen]);

  const showRandomMessage = () => {
    if (viewedMessages.length >= messages.length) {
      setRandomMessage({ text: "모든 알림을 다 확인하였습니다." });
      playSound();
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * messages.length);
    } while (viewedMessages.includes(randomIndex));

    setViewedMessages([...viewedMessages, randomIndex]);
    setRandomMessage(messages[randomIndex]);
    playSound();
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (randomMessage.link) {
      navigate(randomMessage.link);
    }
    showRandomMessage();
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log('Audio playback failed:', error));
    }
  };

  const handleCloseBanner = () => {
    setBannerOpen(false);
    localStorage.setItem('bannerClosed', 'true');
  };

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-50">
          <div className="bg-gray-800 border border-transparent dark:border-gray-700/60 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div className="text-gray-500 inline-flex">
              <a
                className="font-medium hover:underline text-gray-50"
                href={randomMessage.link || "#"}
                onClick={handleLinkClick}
              >
                {randomMessage.text}
              </a>
            </div>
            <button
              className="text-gray-500 hover:text-gray-400 pl-2 ml-3 border-l border-gray-700/60"
              onClick={handleCloseBanner}
            >
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 16 16">
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 101.414 1.414l3.293-3.293 3.293 3.293a1 1 001.414-1.414L9.426 8l3.293-3.293a1 1 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <audio ref={audioRef} src="/path/to/your/sound.mp3" />
    </>
  );
}

export default Banner;
