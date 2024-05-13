import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const BarTitle = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch your JSON data from the server
      const response = await axios.get('http://localhost:3001/getRawdata');
      const data = response.data;

      // Prepare data for the line chart
      const chartData = prepareChartData(data);

      // Update state with the chart data
      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const prepareChartData = (data) => {
    // Initialize an empty object to hold counts of titles for each sector
    const sectorTitleCounts = {};

    // Iterate over each data entry
    data.forEach(entry => {
      const { sector } = entry;

      // Skip entry if sector is empty or not defined
      if (!sector) {
        return;
      }

      // Increment the count of titles for the corresponding sector
      if (!sectorTitleCounts[sector]) {
        sectorTitleCounts[sector] = 1;
      } else {
        sectorTitleCounts[sector]++;
      }
    });

    // Convert sectorTitleCounts object into an array of arrays
    // Suitable for Google Charts
    const chartData = [['Sector', 'Number of Titles']];
    Object.entries(sectorTitleCounts).forEach(([sector, titleCount]) => {
      chartData.push([sector, titleCount]);
    });

    return chartData;
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          hAxis: { title: 'Sector' },
          vAxis: { title: 'Number of Titles' },
          legend: { position: 'none' },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default BarTitle;
