import React, { useState, useEffect } from 'react';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CurrentHumidity({ humidity }) {
  const [counter, setCounter] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [humidityData, setHumidityData] = useState(Array(10).fill({ time: new Date(), humidity: 0 }));

  const minHumidity = 0;
  const maxHumidity = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
      setCurrentDateTime(new Date());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (humidity && humidity.length > 0) {
      const newHumidity = parseFloat(humidity[counter % humidity.length]);
      setCurrentHumidity(newHumidity);
      setHumidityData(prevData => {
        const newData = [...prevData, { time: new Date(), humidity: newHumidity }];
        if (newData.length > 10) newData.shift();
        return newData;
      });
    }
  }, [counter, humidity]);

  const progressPercentage = ((currentHumidity - minHumidity) / (maxHumidity - minHumidity)) * 100;
  const circumference = 2 * Math.PI * 48.6; // 0.8 * 0.9 * 67.5
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const svgWidth = 600; // Reduced the width to half
  const svgHeight = 600;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / 9) * width;
  const yScale = (humidity) => height - ((humidity - minHumidity) / (maxHumidity - minHumidity)) * height;

  const line = humidityData.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.humidity)}`
  ).join(' ');

  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  const gradientId = "humidityGradient";

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">현재 대기 습도</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">범위: {minHumidity}% - {maxHumidity}%</span>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center ml-4">
            <svg className="w-24 h-24" viewBox="0 0 108 108">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="54"
                cy="54"
                r="48.6"
                fill="transparent"
              ></circle>
              <circle
                className="text-blue-500 stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="54"
                cy="54"
                r="48.6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 54 54)"
              ></circle>
            </svg>
            <div className="ml-4">
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {currentHumidity.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {currentDateTime.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[400px]">
          <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.2)`} />
                <stop offset="100%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0)`} />
              </linearGradient>
            </defs>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <path d={area} fill={`url(#${gradientId})`} />
              <path d={line} fill="none" stroke={tailwindConfig().theme.colors.blue[500]} strokeWidth="2" />
              {humidityData.map((point, index) => (
                <circle
                  key={index}
                  cx={xScale(index)}
                  cy={yScale(point.humidity)}
                  r="3"
                  fill={tailwindConfig().theme.colors.blue[500]}
                />
              ))}
              <g className="axis-y" transform={`translate(0, 0)`}>
                {[0, 20, 40, 60, 80, 100].map((tick) => (
                  <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                    <line x2={width} stroke="currentColor" strokeDasharray="2,2" />
                    <text x="-9" dy="0.32em" textAnchor="end" fill="currentColor" fontSize="15">
                      {tick}%
                    </text>
                  </g>
                ))}
              </g>
              <g className="axis-x" transform={`translate(0, ${height})`}>
                {humidityData.filter((_, i) => i % 3 === 0).map((point, index) => (
                  <g key={index} transform={`translate(${xScale(index * 3)}, 0)`}>
                    <line y2="6" stroke="currentColor" />
                    <text y="9" dy="0.71em" textAnchor="middle" fill="currentColor" fontSize="15">
                      {point.time.toLocaleTimeString()}
                    </text>
                  </g>
                ))}
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default CurrentHumidity;
