import "./Home.css";
import React  from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMemo } from 'react';
import {
  MaterialReactTable,
} from 'material-react-table';
import Box from '@mui/material/Box';
import SideBar from "../Sidebar";


const Home = () => {

    const [Rawdata, SetRawdata] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect (()=> {
        axios.get("http://localhost:3001/getRawdata")
        .then(Rawdata => {
            SetRawdata(Rawdata.data);
          setloading(false);})
        .catch(err => console.log(err))
    }, [])


  const columns = useMemo(
    () => [
      {
        accessorKey: 'sector', 
        header: 'Sector',
        size: 150,
      },
      {
        accessorKey: 'pestle',
        header: 'Pestle',
        size: 150,
      },
      {
        accessorKey: 'country', 
        header: 'Country',
        size: 150,
      },
      {
        accessorKey: 'region',
        header: 'Region',
        size: 150,
      },
      {
        accessorKey: 'start_year',
        header: 'start-year',
        size: 150,
      },
      {
        accessorKey: 'end_year',
        header: 'end_year',
        size: 150,
      },
      {
        accessorKey: 'topic',
        header: 'topic',
        size: 150,
      },
      {
        accessorKey: 'title',
        header: 'title',
        size: 150,
      },
      {
        accessorKey: 'intensity',
        header: 'intensity',
        size: 150,
      },
      {
        accessorKey: 'impact',
        header: 'impact',
        size: 150,
      },
      {
        accessorKey: 'relevance',
        header: 'relevance',
        size: 150,
      },
    ],
    [],
  );

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <SideBar/>
    <Box sx={{ flexGrow: 1, p: 3 }}>
    <h1>Table</h1>
    <div style={{ width: '100%', height: '100%' }}>
    {!loading && (
    <MaterialReactTable columns= {columns} data={Rawdata} />
  )}
  </div>
    </Box>
    </Box>
    </>
  );
  };

export default Home;