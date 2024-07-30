import React, { useState } from 'react';

function OnOffToggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex items-center">
      <div 
        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
          isOn ? 'bg-green-500' : 'bg-gray-300'
        }`}
        onClick={() => setIsOn(!isOn)}
      >
        <div 
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            isOn ? 'translate-x-7' : ''
          }`}
        ></div>
      </div>
      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
        {isOn ? 'Alarm ON' : 'Alarm OFF'}
      </span>
    </div>
  );
}

export default OnOffToggle;