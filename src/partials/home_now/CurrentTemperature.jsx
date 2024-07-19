import axios from "axios";
import React, { useState, useEffect } from 'react';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CurrentTemperature() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://175.205.128.9:9000/test')
        setMessage("연결 성공");
        setMessage(response.data)
        console.log(response.data);
        setError(false);
      } catch (error) {
        setMessage("연결 실패");
        setError(true);
        console.error("Error:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemperature = Math.random() * (42 - 20) + 15; // Random temperature between 15 and 38
      setTemperatureData(prevData => {
        const newData = [...prevData, { time: new Date(), temp: newTemperature }];
        if (newData.length > 50) newData.shift(); // Keep only last 50 data points
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const svgWidth = 595;
  const svgHeight = 248;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / (temperatureData.length - 1)) * width;
  const yScale = (temp) => height - ((temp - 20) / (38 - 20)) * height;

  const line = temperatureData.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.temp)}`
  ).join(' ');

  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  const gradientId = "tempGradient";

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">대기 온도</h2>
      </header>
      <div className="px-5 py-3">
        {isLoading ? (
          <p>연결 중...</p>
        ) : error ? (
          <p className="text-red-500">{message}</p>
        ) : (
          <p className="text-green-500">{message}</p>
        )}
      </div>
      <svg width={svgWidth} height={svgHeight}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.orange[500])}, 0.2)`} />
            <stop offset="100%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.orange[500])}, 0)`} />
          </linearGradient>
        </defs>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path d={area} fill={`url(#${gradientId})`} />
          <path d={line} fill="none" stroke={tailwindConfig().theme.colors.orange[500]} strokeWidth="2" />
          {temperatureData.map((point, index) => (
            <circle
              key={index}
              cx={xScale(index)}
              cy={yScale(point.temp)}
              r="3"
              fill={tailwindConfig().theme.colors.orange[500]}
            />
          ))}
          <g className="axis-y" transform={`translate(0, 0)`}>
            {[20, 25, 30, 35, 38].map((tick) => (
              <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                <line x2="-6" stroke="currentColor" />
                <text x="-9" dy="0.32em" textAnchor="end" fill="currentColor" fontSize="10">
                  {tick}°C
                </text>
              </g>
            ))}
          </g>
          <g className="axis-x" transform={`translate(0, ${height})`}>
            {temperatureData.filter((_, i) => i % 10 === 0).map((point, index) => (
              <g key={index} transform={`translate(${xScale(index * 10)}, 0)`}>
                <line y2="6" stroke="currentColor" />
                <text y="9" dy="0.71em" textAnchor="middle" fill="currentColor" fontSize="10">
                  {point.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

export default CurrentTemperature;