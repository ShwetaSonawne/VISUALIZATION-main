import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Pages/Home'
import GeoChart from './Pages/GeoChart'
import PieChart from './Pages/PieChart'
import BarTitle from './Pages/BarTitle'
import BarChart from './Pages/BarChart'
import LineChart from './Pages/Linechart'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/geochart' element={<GeoChart/>}></Route>
        <Route path='/piechart' element={<PieChart/>}></Route>
        <Route path='/bartitle' element={<BarTitle/>}></Route>
        <Route path='/barchart' element={<BarChart/>}></Route>
        <Route path='/linechart' element={<LineChart/>}></Route>        
      </Routes>
    </BrowserRouter>
  )
}

export default App
