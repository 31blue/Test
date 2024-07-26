import React, { useState, useEffect } from 'react';
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard11({ temp, humidity }) {
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const minTemp = 0;
  const maxTemp = 30;
  const minHumidity = 0;
  const maxHumidity = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());

      if (temp && humidity && temp.length > 0 && humidity.length > 0) {
        const newIndex = (index + 1) % temp.length;
        setIndex(newIndex);

        const newTemp = parseFloat(temp[newIndex]);
        const newHumidity = parseFloat(humidity[newIndex]);

        setCurrentTemp(newTemp);
        setCurrentHumidity(newHumidity);

        setData(prevData => {
          const newData = [...prevData, { time: new Date(), temp: newTemp, humidity: newHumidity }];
          if (newData.length > 50) newData.shift();
          return newData;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [index, temp, humidity]);

  const svgWidth = 600;
  const svgHeight = 400;
  const margin = { top: 20, right: 50, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / 49) * width;
  const yScaleTemp = (value) => height - ((value - minTemp) / (maxTemp - minTemp)) * height;
  const yScaleHumidity = (value) => height - ((value - minHumidity) / (maxHumidity - minHumidity)) * height;

  const tempLine = data.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScaleTemp(point.temp)}`
  ).join(' ');

  const humidityLine = data.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScaleHumidity(point.humidity)}`
  ).join(' ');

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">온습도 그래프</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          온도 범위: {minTemp}°C - {maxTemp}°C | 습도 범위: {minHumidity}% - {maxHumidity}%
        </span>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="ml-4">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              온도: {currentTemp.toFixed(2)}°C, 습도: {currentHumidity.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {currentDateTime.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="h-[400px]">
          <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <path d={tempLine} fill="none" stroke={tailwindConfig().theme.colors.blue[500]} strokeWidth="2" />
              <path d={humidityLine} fill="none" stroke={tailwindConfig().theme.colors.green[500]} strokeWidth="2" />
              {data.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={xScale(index)}
                    cy={yScaleTemp(point.temp)}
                    r="3"
                    fill={tailwindConfig().theme.colors.blue[500]}
                  />
                  <circle
                    cx={xScale(index)}
                    cy={yScaleHumidity(point.humidity)}
                    r="3"
                    fill={tailwindConfig().theme.colors.green[500]}
                  />
                </g>
              ))}
              <g className="axis-y" transform={`translate(0, 0)`}>
                {[0, 6, 12, 18, 24, 30].map((tick) => (
                  <g key={tick} transform={`translate(0, ${yScaleTemp(tick)})`}>
                    <line x2={width} stroke="currentColor" strokeDasharray="2,2" />
                    <text x="-9" dy="0.32em" textAnchor="end" fill={tailwindConfig().theme.colors.blue[500]} fontSize="12">
                      {tick}°C
                    </text>
                    <text x={width + 9} dy="0.32em" textAnchor="start" fill={tailwindConfig().theme.colors.green[500]} fontSize="12">
                      {(tick / 30 * 100).toFixed(0)}%
                    </text>
                  </g>
                ))}
              </g>
              <g className="axis-x" transform={`translate(0, ${height})`}>
                {data.filter((_, i) => i % 10 === 0).map((point, index) => (
                  <g key={index} transform={`translate(${xScale(index * 10)}, 0)`}>
                    <line y2="6" stroke="currentColor" />
                    <text y="9" dy="0.71em" textAnchor="middle" fill="currentColor" fontSize="12">
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

export default DashboardCard11;