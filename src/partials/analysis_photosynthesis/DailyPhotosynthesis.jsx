import React, { useState, useEffect } from 'react';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DailyPhotosynthesis() {
  const [photosynthesisData, setPhotosynthesisData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const data = [];
      const currentHour = new Date().getHours();
      for (let i = 0; i <= 23; i++) {
        data.push({ time: `${i}시`, value: i <= currentHour ? Math.random() * 100 : null });
      }
      setPhotosynthesisData(data);
    };

    generateData();
    const interval = setInterval(generateData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const svgWidth = 800; // 그래프의 가로 길이를 늘림
  const svgHeight = 248;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / 23) * width; // Always scale to 24 hours
  const yScale = (value) => height - (value / 100) * height;

  const line = photosynthesisData
    .filter(point => point.value !== null)
    .map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${xScale(photosynthesisData.indexOf(point))} ${yScale(point.value)}`
    ).join(' ');

  const area = `${line} L ${xScale(photosynthesisData.filter(point => point.value !== null).length - 1)} ${height} L ${xScale(0)} ${height} Z`;

  const gradientId = "photosynthesisGradient";

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">오늘도 광합성 중입니다!</h2>
      </header>
      <div className="p-3">
        <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.2)`} />
              <stop offset="100%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0)`} />
            </linearGradient>
          </defs>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <path d={area} fill={`url(#${gradientId})`} />
            <path d={line} fill="none" stroke={tailwindConfig().theme.colors.green[500]} strokeWidth="2" />
            {photosynthesisData.filter(point => point.value !== null).map((point, index) => (
              <circle
                key={index}
                cx={xScale(photosynthesisData.indexOf(point))}
                cy={yScale(point.value)}
                r="3"
                fill={tailwindConfig().theme.colors.green[500]}
              />
            ))}
            <g className="axis-y" transform={`translate(0, 0)`}>
              {[0, 20, 40, 60, 80, 100].map((tick) => (
                <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                  <line x2={width} stroke="currentColor" strokeDasharray="2,2" />
                  <text x="-9" dy="0.32em" textAnchor="end" fill="currentColor" fontSize="10">
                    {tick}
                  </text>
                </g>
              ))}
            </g>
            <g className="axis-x" transform={`translate(0, ${height})`}>
              {photosynthesisData.filter((_, i) => i % 3 === 0).map((point, index) => (
                <g key={index} transform={`translate(${xScale(index * 3)}, 0)`}>
                  <line y2="6" stroke="currentColor" />
                  <text y="9" dy="0.71em" textAnchor="middle" fill="currentColor" fontSize="10">
                    {point.time}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default DailyPhotosynthesis;