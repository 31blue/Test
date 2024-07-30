import React, { useState, useEffect } from 'react';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CurrentTemperature({ temp }) {
  const [counter, setCounter] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [tempData, setTempData] = useState(Array(10).fill({ time: new Date(), temp: 0 }));

  const minTemp = 0;
  const maxTemp = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
      setCurrentDateTime(new Date());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (temp && temp.length > 0) {
      const newTemp = parseFloat(temp[counter % temp.length]);
      setCurrentTemp(newTemp);
      setTempData(prevData => {
        const newData = [...prevData, { time: new Date(), temp: newTemp }];
        if (newData.length > 10) newData.shift();
        return newData;
      });
    }
  }, [counter, temp]);

  const progressPercentage = ((currentTemp - minTemp) / (maxTemp - minTemp)) * 100;
  const circumference = 2 * Math.PI * 48.6; // 0.8 * 0.9 * 67.5
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const svgWidth = 600; // Reduced the width to half
  const svgHeight = 600;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / 9) * width;
  const yScale = (temp) => height - ((temp - minTemp) / (maxTemp - minTemp)) * height;

  const line = tempData.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.temp)}`
  ).join(' ');

  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  const gradientId = "tempGradient";

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">현재 대기 온도</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">범위: {minTemp}°C - {maxTemp}°C</span>
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
                className="text-red-500 stroke-current"
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
                {currentTemp.toFixed(1)}°C
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
                <stop offset="0%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.red[500])}, 0.2)`} />
                <stop offset="100%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.red[500])}, 0)`} />
              </linearGradient>
            </defs>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <path d={area} fill={`url(#${gradientId})`} />
              <path d={line} fill="none" stroke={tailwindConfig().theme.colors.red[500]} strokeWidth="2" />
              {tempData.map((point, index) => (
                <circle
                  key={index}
                  cx={xScale(index)}
                  cy={yScale(point.temp)}
                  r="3"
                  fill={tailwindConfig().theme.colors.red[500]}
                />
              ))}
              <g className="axis-y" transform={`translate(0, 0)`}>
                {[0, 10, 20, 30, 40, 50].map((tick) => (
                  <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                    <line x2={width} stroke="currentColor" strokeDasharray="2,2" />
                    <text x="-9" dy="0.32em" textAnchor="end" fill="currentColor" fontSize="15">
                      {tick}°C
                    </text>
                  </g>
                ))}
              </g>
              <g className="axis-x" transform={`translate(0, ${height})`}>
                {tempData.filter((_, i) => i % 3 === 0).map((point, index) => (
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

export default CurrentTemperature;
