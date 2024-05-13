import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import Box from '@mui/material/Box';
import SideBar from "../Sidebar";

const GeoChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/geo');
        const data = response.data;

        const topicCounts = {};
        data.forEach(entry => {
        const { country, title } = entry;
         
        if (!country) {
          return;
        }

        if (country === "United States of America") {
          return;
        }

          if (!topicCounts[country]) {
            topicCounts[country] = {};
          }

          if (!topicCounts[country][title]) {
            topicCounts[country][title] = 1;
          } else {
            topicCounts[country][title]++;
          }
        });

        const formattedData = [
          ['Country', 'Number of Trending Titles'],
          ...Object.entries(topicCounts).map(([country, titles]) => {
            const totalCount = Object.values(titles).reduce((acc, count) => acc + count, 0);
            return [country, totalCount];
          })
        ];

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <SideBar/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h1>Geography</h1>
    <div style={{ width: '100%', height: '500px' }}>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="GeoChart"
        data={chartData}
        options={{
          minValue: 0,
          maxValue: 100,
          colorAxis: { colors: ['#FF0000', '#00FF00'] },
          backgroundColor: '#f0f0f0',
          datalessRegionColor: '#e0e0e0',
          defaultColor: '#f5f5f5',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
    </Box>
    </Box>
    </>
  );
};

export default GeoChart;