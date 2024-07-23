import React, { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard05(temp) {

  // IMPORTANT:
  // Code below is for demo purpose only, and it's not covered by support.
  // If you need to replace dummy data with real data,
  // refer to Chart.js documentation: https://www.chartjs.org/docs/latest

  // Fake real-time data
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);

  
  // Dummy data to be looped
  const data = temp;
  console.log(data)

  // const [slicedData, setSlicedData] = useState(data.slice(0, range));

  // // Generate fake dates from now to back in time
  // const generateDates = () => {
  //   const now = new Date();
  //   const dates = [];
  //   data.forEach((v, i) => {
  //     dates.push(new Date(now - 2000 - i * 2000));
  //   });
  //   return dates;
  // };
  

  // const [slicedLabels, setSlicedLabels] = useState(generateDates().slice(0, range).reverse());

  // Fake update every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 2000);
    return () => clearInterval(interval)
  }, [counter]);

  // Loop through data array and update
  useEffect(() => {
    setIncrement(increment + 1);
    if (increment + range < data.length) {
      setSlicedData(([x, ...slicedData]) => [...slicedData, data[increment + range]]);
    } else {
      setIncrement(0);
      setRange(0);
    }
    // setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()]);
    return () => setIncrement(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const chartData = {
    // labels: slicedLabels,
    datasets: [
      // Indigo line
      {
        data: data.temp,
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
            { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` }
          ]);
        },       
        borderColor: tailwindConfig().theme.colors.violet[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,          
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Real Time Value</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Built with <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer">Chart.js</a></div>
        </Tooltip>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard05;
