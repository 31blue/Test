import React, { useState, useEffect } from 'react';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DailyPhotosynthesis() {
  const [photosynthesisData, setPhotosynthesisData] = useState([]);
  const [maxPhotosynthesis, setMaxPhotosynthesis] = useState({ time: '', value: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });
  
  // Get yesterday's date in YYYY-MM-DD format
  const getYesterdayDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const generateData = () => {
      const data = [];
      let maxData = { time: '', value: 0 };

      for (let i = 0; i < 24; i++) {
        const value = Math.random() * 100;
        data.push({ time: `${i}시`, value });

        if (value > maxData.value) {
          maxData = { time: `${i}시`, value };
        }
      }

      setPhotosynthesisData(data);
      setMaxPhotosynthesis(maxData);
    };

    generateData();
  }, []);

  const svgWidth = 800;
  const svgHeight = 248;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / 23) * width;
  const yScale = (value) => height - (value / 100) * height;

  const line = photosynthesisData
    .map((point, index) =>
      `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.value)}`
    ).join(' ');

  const area = `${line} L ${xScale(23)} ${height} L ${xScale(0)} ${height} Z`;

  const gradientId = "photosynthesisGradient";

  const handleMouseOver = (event, point) => {
    const { clientX, clientY } = event;
    const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
    const x = xScale(photosynthesisData.indexOf(point)) + margin.left;
    const y = yScale(point.value) + margin.top;
    setTooltip({
      visible: true,
      x,
      y,
      data: point,
    });
  };

  const handleMouseOut = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      data: null,
    });
  };

  return (
    <div className="relative col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          어제({getYesterdayDate()})의 광합성량입니다.
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          어느 시간대에 가장 활발히 광합성을 하는지 확인해보세요!
        </p>
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
            {photosynthesisData.map((point, index) => (
              <circle
                key={index}
                cx={xScale(index)}
                cy={yScale(point.value)}
                r="3"
                fill={tailwindConfig().theme.colors.green[500]}
                onMouseOver={(event) => handleMouseOver(event, point)}
                onMouseOut={handleMouseOut}
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
        {tooltip.visible && (
          <div
            className="absolute text-xs p-2 rounded shadow-lg"
            style={{
              top: tooltip.y,
              left: tooltip.x + margin.left + 10,
              backgroundColor: 'rgba(200, 255, 200, 0.8)', // 아주 연한 초록색 배경
              border: '1px solid rgba(100, 200, 100, 0.8)', // 살짝 진한 초록색 테두리
            }}
          >
            <div>{tooltip.data.time}</div>
            <div>{tooltip.data.value.toFixed(2)} μmol m⁻² s⁻¹</div>
          </div>
        )}
        <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p>가장 많은 광합성량: {maxPhotosynthesis.time} - {maxPhotosynthesis.value.toFixed(2)} μmol m⁻² s⁻¹</p>
        </div>
      </div>
    </div>
  );
}

export default DailyPhotosynthesis;
