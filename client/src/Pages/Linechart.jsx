import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideBar from "../Sidebar";
import PieChart from "./PieChart";


const LineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch your JSON data from the server
      const response = await axios.get('http://localhost:3001/getRawdata');
      const data = response.data;

      // Prepare data for the bubble chart
      const chartData = prepareChartData(data);

      // Update state with the chart data
      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const prepareChartData = (data) => {
    // Initialize an array to hold the data points
    const bubbleData = [['Title', 'Relevance', 'Likelihood', 'Impact']];

    // Iterate over each data entry
    data.forEach(entry => {
      const { title, relevance, likelihood, impact } = entry;

      // Skip entry if any parameter is missing or not defined
      if (!title || !relevance || !likelihood || !impact) {
        return;
      }

      // Add data point to the bubbleData array
      bubbleData.push([title, parseFloat(relevance), parseFloat(likelihood), parseFloat(impact)]);
    });

    return bubbleData;
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <SideBar/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h1>Relevance, Impact and Likelihood of a Title </h1>
    <Stack spacing={2}>
    <div style={{ width: '100%', height: '500px' }}>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          hAxis: { title: 'Relevance' },
          vAxis: { title: 'Likelihood' },
          bubble: { textStyle: { fontSize: 11 } },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div> 
    <h1>Major Sector</h1>  
    <PieChart/>   
      </Stack>
      </Box>
    </Box>
    </>
  );
};

export default LineChart;
