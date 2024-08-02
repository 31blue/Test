import React, { useState, useEffect, useRef } from 'react';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DailyEvapotranspiration({ plantData = [] }) {
  const [evapotranspirationData, setEvapotranspirationData] = useState([]);
  const [maxEvapotranspiration, setMaxEvapotranspiration] = useState({ time: '', value: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });
  const dashboardRef = useRef(null);

  const formatData = (data) => {
    if (Array.isArray(data)) {
      const extractedData = data.slice(0, 24).reverse();
      return extractedData.map(value => Number(value.toFixed(4)));
    }
    return data;
  };

  useEffect(() => {
    const formattedData = formatData(plantData);
    const data = formattedData.map((value, index) => ({ time: `${23 - index}시`, value }));

    const maxData = data.reduce((max, point) => point.value > max.value ? point : max, { time: '', value: 0 });

    setEvapotranspirationData(data);
    setMaxEvapotranspiration(maxData);
  }, [plantData]);

  const svgWidth = 800;
  const svgHeight = 248;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / 23) * width;
  const yScale = (value) => height - ((value + 10) / 20) * height;

  const line = evapotranspirationData
    .map((point, index) =>
      `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.value)}`
    ).join(' ');

  const area = `${line} L ${xScale(23)} ${height} L ${xScale(0)} ${height} Z`;

  const gradientId = "evapotranspirationGradient";

  const handleMouseOver = (event, point) => {
    const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
    const dashboardRect = dashboardRef.current.getBoundingClientRect();
    let x = xScale(evapotranspirationData.indexOf(point)) + margin.left;
    let y = yScale(point.value) + margin.top;

    const tooltipWidth = 100;
    const tooltipHeight = 50;

    if (x + tooltipWidth > dashboardRect.width) {
      x = dashboardRect.width - tooltipWidth;
    }

    if (y + tooltipHeight > dashboardRect.height) {
      y = dashboardRect.height - tooltipHeight;
    }

    setTooltip({
      visible: true,
      x,
      y,
      data: point,
    });
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, x: 0, y: 0, data: null });
  };

  const getYesterdayDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div ref={dashboardRef} className="relative col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          어제({getYesterdayDate()})의 증발산량
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          가장 활발한 증발산량이 이루어지는 시간대를 확인해보세요!
        </p>
      </header>
      <div className="p-3">
        <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.2)`} />
              <stop offset="100%" stopColor={`rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0)`} />
            </linearGradient>
          </defs>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <path d={area} fill={`url(#${gradientId})`} />
            <path d={line} fill="none" stroke={tailwindConfig().theme.colors.blue[500]} strokeWidth="2" />
            {evapotranspirationData.map((point, index) => (
              <circle
                key={index}
                cx={xScale(index)}
                cy={yScale(point.value)}
                r="3"
                fill={tailwindConfig().theme.colors.blue[500]}
                onMouseOver={(event) => handleMouseOver(event, point)}
                onMouseOut={handleMouseOut}
              />
            ))}
            <g className="axis-y" transform={`translate(0, 0)`}>
              {[-10, -5, 0, 5, 10].map((tick) => (
                <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                  <line x2={width} stroke="currentColor" strokeDasharray="2,2" />
                  <text x="-9" dy="0.32em" textAnchor="end" fill="currentColor" fontSize="10">
                    {tick}
                  </text>
                </g>
              ))}
            </g>
            <g className="axis-x" transform={`translate(0, ${height})`}>
              {Array.from({ length: 8 }).map((_, index) => {
                const time = `${index * 3}시`;
                return (
                  <g key={index} transform={`translate(${xScale(index * 3)}, 0)`}>
                    <line y2="6" stroke="currentColor" />
                    <text y="9" dy="0.71em" textAnchor="middle" fill="currentColor" fontSize="10">
                      {time}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
        {tooltip.visible && (
          <div
            className="absolute text-xs p-2 rounded shadow-lg"
            style={{
              top: tooltip.y,
              left: tooltip.x,
              backgroundColor: 'rgba(173, 216, 230, 0.8)',
              border: '1px solid rgba(70, 130, 180, 0.8)',
              color: 'rgba(0, 0, 139, 1)',
            }}
          >
            <div>{tooltip.data.time}</div>
            <div>{tooltip.data.value.toFixed(4)} mm/h</div>
          </div>
        )}
        <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p>가장 많은 증발산량: {maxEvapotranspiration.time} - {maxEvapotranspiration.value.toFixed(4)} mm/h</p>
        </div>
      </div>
    </div>
  );
}

export default DailyEvapotranspiration;