import { Chart } from "react-google-charts";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PieChart = () => {
  const [piedata, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getRawdata');
        const data = response.data;

        const sectorCounts = {};
        data.forEach(entry => {
        const { sector } = entry;
         
        if (!sector) {
          return;
        }

        if (!sectorCounts[sector]) {
          sectorCounts[sector] = 1;
        } else {
          sectorCounts[sector]++;
        }
      });

        const formattedData = [
          ['sector', 'Number of sector'],
          ...Object.entries(sectorCounts).map(([sector, count]) => [sector, count])
        ];

        console.log(formattedData);
        setPieData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


const options = {
  title: "Trending Sectors",
  pieHole: 0.4,
  is3D: true,
};

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={piedata}
      options={options}
    />
  );
};

export default PieChart;
