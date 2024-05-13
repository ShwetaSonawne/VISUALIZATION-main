import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import Box from '@mui/material/Box';
import SideBar from "../Sidebar";
import Stack from '@mui/material/Stack';
import BarTitle from './BarTitle';

const BarChart = () => {
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
    const sourceTitleCounts = {};

    // Iterate over each data entry
    data.forEach(entry => {
      const { source } = entry;

      // Skip entry if sector is empty or not defined
      if (!source) {
        return;
      }

      // Increment the count of titles for the corresponding sector
      if (!sourceTitleCounts[source]) {
        sourceTitleCounts[source] = 1;
      } else {
        sourceTitleCounts[source]++;
      }
    });

    // Convert sectorTitleCounts object into an array of arrays
    const chartData = [['source', 'Number of Titles']];
    Object.entries(sourceTitleCounts).forEach(([source, titleCount]) => {
      chartData.push([source, titleCount]);
    });

    return chartData;
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <SideBar/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Stack spacing={2}>
    <h1>Number of Titles from a source</h1>
    <div style={{ width: '100%', height: '500px' }}>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          hAxis: { title: 'Number of Titles' },
          vAxis: { title: 'Source' },
          legend: { position: 'none' },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
    <h1>Number of Titles in a sector</h1>
    <BarTitle/>
      </Stack>
    
    </Box>
    </Box>
    </>
  );
};

export default BarChart;
