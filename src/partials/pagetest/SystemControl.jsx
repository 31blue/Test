import React, { useState } from 'react';
import { tailwindConfig } from '../../utils/Utils';

function SystemControl() {
  const [ledOn, setLedOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [waterOn, setWaterOn] = useState(false);

  const toggleLed = () => setLedOn(!ledOn);
  const toggleFan = () => setFanOn(!fanOn);
  const toggleWater = () => setWaterOn(!waterOn);

  return (
    <div className={`flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full`}>
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">시스템 제어</h2>
      </header>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <svg width="80" height="80" viewBox="0 0 120 120" className="mb-3">
              <path d="M60 10 C45 10, 30 25, 30 40 C30 55, 45 70, 60 70 C75 70, 90 55, 90 40 C90 25, 75 10, 60 10 Z" 
                    fill={ledOn ? "#FCD34D" : "#D1D5DB"} stroke="#4B5563" strokeWidth="2" />
              <rect x="55" y="70" width="10" height="20" fill="#4B5563" />
              <rect x="50" y="90" width="20" height="10" fill="#4B5563" />
            </svg>
            <button
              onClick={toggleLed}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                ledOn ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'
              } hover:bg-yellow-600 transition-colors duration-200`}
            >
              LED<br />{ledOn ? 'Off' : 'On'}
            </button>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <svg width="80" height="80" viewBox="0 0 120 120" className="mb-3">
              <circle cx="60" cy="60" r="50" fill={fanOn ? "#60A5FA" : "#D1D5DB"} />
              <path d="M60 20 Q80 40 60 60 Q40 80 60 100 M20 60 Q40 40 60 60 Q80 80 100 60" 
                    stroke="#4B5563" strokeWidth="4" fill="none" />
              <circle cx="60" cy="60" r="10" fill="#4B5563" />
            </svg>
            <button
              onClick={toggleFan}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                fanOn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              } hover:bg-blue-600 transition-colors duration-200`}
            >
              쿨링팬<br />{fanOn ? 'Off' : 'On'}
            </button>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <svg width="80" height="80" viewBox="0 0 120 120" className="mb-3">
              {/* 화분 */}
              <path d="M30 80 C30 70, 90 70, 90 80 L85 110 L35 110 Z" fill="#8B4513" />
              {/* 흙 */}
              <path d="M35 80 C35 75, 85 75, 85 80 L82 90 L38 90 Z" fill="#A0522D" />
              {/* 줄기 */}
              <path d="M60 80 Q60 60 60 40" stroke="#4CAF50" strokeWidth="2" fill="none" />
              {/* 잎 */}
              <path d="M60 60 Q70 55 75 60 T60 70" fill="#4CAF50" />
              <path d="M60 60 Q50 55 45 60 T60 70" fill="#4CAF50" />
              {/* 싹 */}
              <circle cx="60" cy="38" r="5" fill={waterOn ? "#8BC34A" : "#A5D6A7"} />
              <path d="M57 40 Q60 30 63 40" fill="none" stroke={waterOn ? "#8BC34A" : "#A5D6A7"} strokeWidth="2" />
            </svg>
            <button
              onClick={toggleWater}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                waterOn ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
              } hover:bg-green-600 transition-colors duration-200`}
            >
              물주기<br />{waterOn ? 'Off' : 'On'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemControl;