import React, { useState, useEffect } from 'react';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CombinedSummaryGraph({ plantData = [], evapoData = [] }) {
  const [photosynthesisData, setPhotosynthesisData] = useState([]);
  const [evapotranspirationData, setEvapotranspirationData] = useState([]);
  const [maxPhotosynthesis, setMaxPhotosynthesis] = useState({ day: '', value: 0 });
  const [maxEvapotranspiration, setMaxEvapotranspiration] = useState({ day: '', value: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

  const formatData = (data) => {
    if (!Array.isArray(data)) return [];
    const formattedData = data
      .slice(0, 7)
      .map(value => Number(value.toFixed(4)));
    const paddedData = [...formattedData, ...Array(7 - formattedData.length).fill(0)];
    return paddedData.reverse();
  };

  const getDates = () => {
    const dates = [];
    for (let i = 7; i > 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.getDate());
    }
    return dates;
  };

  useEffect(() => {
    if (!plantData.length || !evapoData.length) return;
    const formattedPhotoData = formatData(plantData);
    const formattedEvapoData = formatData(evapoData);
    const dates = getDates();
    
    const photoData = formattedPhotoData.map((value, index) => ({
      day: `${dates[index]}`,
      value
    }));
    
    const evapoData = formattedEvapoData.map((value, index) => ({
      day: `${dates[index]}`,
      value
    }));

    const maxPhotoData = photoData.reduce((max, point) => point.value > max.value ? point : max, { day: '', value: 0 });
    const maxEvapoData = evapoData.reduce((max, point) => point.value > max.value ? point : max, { day: '', value: 0 });

    setPhotosynthesisData(photoData);
    setEvapotranspirationData(evapoData);
    setMaxPhotosynthesis(maxPhotoData);
    setMaxEvapotranspiration(maxEvapoData);
  }, [plantData, evapoData]);

  const svgWidth = 800;
  const svgHeight = 300;
  const margin = { top: 20, right: 60, bottom: 30, left: 60 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = (index) => (index / 6) * width;
  const yScalePhoto = (value) => height - (value / 50) * height;
  const yScaleEvapo = (value) => height - (value / 1) * height;

  const barWidth = width / 7 * 0.8;

  const handleMouseOver = (event, point, type) => {
    const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
    const x = xScale(type === 'photo' ? photosynthesisData.indexOf(point) : evapotranspirationData.indexOf(point)) + margin.left;
    const y = type === 'photo' ? yScalePhoto(point.value) + margin.top : yScaleEvapo(point.value) + margin.top;

    const tooltipWidth = 100;
    const tooltipHeight = 50;
    let adjustedX = x - tooltipWidth / 2;
    let adjustedY = y - tooltipHeight - 10;

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
    <div className="relative col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          최근 7일간의 평균 광합성량 및 증발산량 ({getDateRange()})
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          최근 7일간의 평균 광합성량과 증발산량 변화를 확인해보세요!
        </p>
      </header>
      <div className="p-3">
        <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {photosynthesisData.map((point, index) => (
              <rect
                key={`photo-${index}`}
                x={xScale(index) - barWidth / 2}
                y={yScalePhoto(point.value)}
                width={barWidth}
                height={height - yScalePhoto(point.value)}
                fill={`rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.2)`}
                stroke={tailwindConfig().theme.colors.green[500]}
                strokeWidth="1"
                onMouseOver={(event) => handleMouseOver(event, point, 'photo')}
                onMouseOut={handleMouseOut}
              />
            ))}
            {evapotranspirationData.map((point, index) => (
              <rect
                key={`evapo-${index}`}
                x={xScale(index) - barWidth / 2}
                y={yScaleEvapo(point.value)}
                width={barWidth}
                height={height - yScaleEvapo(point.value)}
                fill={`rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.2)`}
                stroke={tailwindConfig().theme.colors.blue[500]}
                strokeWidth="1"
                onMouseOver={(event) => handleMouseOver(event, point, 'evapo')}
                onMouseOut={handleMouseOut}
              />
            ))}
            <g className="axis-y" transform={`translate(0, 0)`}>
              {[0, 10, 20, 30, 40, 50].map((tick) => (
                <g key={`photo-${tick}`} transform={`translate(0, ${yScalePhoto(tick)})`}>
                  <line x2={width} stroke="currentColor" strokeDasharray="2,2" />
                  <text x="-9" dy="0.32em" textAnchor="end" fill="currentColor" fontSize="10">
                    {tick}
                  </text>
                </g>
              ))}
              <text x="-30" y="-10" textAnchor="middle" fill="currentColor" fontSize="12">
                광합성량 (μmol m⁻² s⁻¹)
              </text>
            </g>
            <g className="axis-y" transform={`translate(${width}, 0)`}>
              {[0, 0.2, 0.4, 0.6, 0.8, 1].map((tick) => (
                <g key={`evapo-${tick}`} transform={`translate(0, ${yScaleEvapo(tick)})`}>
                  <line x2={-width} stroke="currentColor" strokeDasharray="2,2" />
                  <text x="9" dy="0.32em" textAnchor="start" fill="currentColor" fontSize="10">
                    {tick}
                  </text>
                </g>
              ))}
              <text x="30" y="-10" textAnchor="middle" fill="currentColor" fontSize="12">
                증발산량 (mm)
              </text>
            </g>
          </g>
        </svg>
        {tooltip.visible && (
          <div
            className="absolute bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-lg text-xs"
            style={{ top: tooltip.y, left: tooltip.x, pointerEvents: 'none' }}
          >
            <div>{tooltip.data.day}일</div>
            <div>값: {tooltip.data.value}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CombinedSummaryGraph;