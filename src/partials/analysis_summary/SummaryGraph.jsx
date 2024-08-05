import React, { useState, useEffect } from 'react';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function SummaryGraph({ plantData = [] }) {
  const [photosynthesisData, setPhotosynthesisData] = useState([]);
  const [maxPhotosynthesis, setMaxPhotosynthesis] = useState({ day: '', value: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

  const formatData = (data) => {
    if (!Array.isArray(data)) return data;

    const formattedData = data
      .slice(0, 7)  // 최근 7일 데이터 사용 (오늘 제외)
      .map(value => Number(value.toFixed(4)));

    const paddedData = [...formattedData, ...Array(7 - formattedData.length).fill(0)];
    
    return paddedData.reverse();
  };

  const getDates = () => {
    const dates = [];
    for (let i = 7; i > 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.getDate());  // 날짜의 '일'만 저장
    }
    return dates;
  };

  useEffect(() => {
    const formattedData = formatData(plantData);
    const dates = getDates();
    const data = Array.isArray(formattedData) && Array.isArray(dates)
    ? formattedData.map((value, index) => ({
        day: dates[index] || '', // dates 배열이 짧을 경우 기본값으로 빈 문자열 사용
        value
      }))
    : []; // 빈 배열을 기본값으로 사용

    const maxData = data.reduce((max, point) => point.value > max.value ? point : max, { day: '', value: 0 });

    setPhotosynthesisData(data);
    setMaxPhotosynthesis(maxData);
  }, [plantData]);

  const svgWidth = 800;
  const svgHeight = 248;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / 6) * (width * 0.8) + width * 0.1;  // 80% of width, centered
  const yScale = (value) => height - (value / 50) * height;

  const barWidth = (width * 0.8) / 7 * 0.8;  // 80% of the available width for each bar

  const handleMouseOver = (event, point) => {
    const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
    const x = xScale(photosynthesisData.indexOf(point)) + margin.left;
    const y = yScale(point.value) + margin.top;

    const tooltipWidth = 100;
    const tooltipHeight = 50;
    let adjustedX = x - tooltipWidth / 2;
    let adjustedY = y - tooltipHeight - 10;

    // Ensure tooltip stays within the dashboard
    if (adjustedX < margin.left) adjustedX = margin.left;
    if (adjustedX + tooltipWidth > svgWidth - margin.right) adjustedX = svgWidth - margin.right - tooltipWidth;
    if (adjustedY < margin.top) adjustedY = y + 10;

    setTooltip({
      visible: true,
      x: adjustedX,
      y: adjustedY,
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

  const getDateRange = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return `${formatDate(sevenDaysAgo)} ~ ${formatDate(yesterday)}`;
  };

  return (
    <div className="relative col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          최근 7일간의 광합성량 ({getDateRange()})
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          최근 7일간의 일일 광합성량 변화를 확인해보세요!
        </p>
      </header>
      <div className="p-3">
        <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {photosynthesisData.map((point, index) => (
              <rect
                key={index}
                x={xScale(index) - barWidth / 2}
                y={yScale(point.value)}
                width={barWidth}
                height={height - yScale(point.value)}
                fill={`rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.2)`}
                stroke={tailwindConfig().theme.colors.green[500]}
                strokeWidth="1"
                onMouseOver={(event) => handleMouseOver(event, point)}
                onMouseOut={handleMouseOut}
              />
            ))}
            <g className="axis-y" transform={`translate(0, 0)`}>
              {[0, 10, 20, 30, 40, 50].map((tick) => (
                <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                  <line x2={width} stroke="currentColor" strokeDasharray="2,2" />
                  <text x="-9" dy="0.32em" textAnchor="end" fill="currentColor" fontSize="10">
                    {tick}
                  </text>
                </g>
              ))}
            </g>
            <g className="axis-x" transform={`translate(0, ${height})`}>
              {photosynthesisData.map((point, index) => (
                <g key={index} transform={`translate(${xScale(index)}, 0)`}>
                  <line y2="6" stroke="currentColor" />
                  <text y="9" dy="0.71em" textAnchor="middle" fill="currentColor" fontSize="10">
                    {point.day}
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
              left: tooltip.x,
              backgroundColor: 'rgba(200, 255, 200, 0.8)',
              border: '1px solid rgba(100, 200, 100, 0.8)',
            }}
          >
            <div>{tooltip.data.day}일</div>
            <div>{tooltip.data.value.toFixed(2)} μmol m⁻² s⁻¹</div>
          </div>
        )}
        <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p>가장 높은 평균 광합성량: {maxPhotosynthesis.day}일 - {maxPhotosynthesis.value.toFixed(2)} μmol m⁻² s⁻¹</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryGraph;