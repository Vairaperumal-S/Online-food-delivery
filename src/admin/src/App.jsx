import React from 'react'
//import {Routes,Route} from 'react-router-dom'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Showmax from './Showmax'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Add from './Add'
import Addres from './Addres'
import List from './List'
import Listres from './Listres'
import Orders from './Orders'
import './App.css';

function App() {

  const url='http://localhost:4000'
  return (
    <Router>
    <div>
     <ToastContainer/>
    <Navbar/>
    <hr/>
    <div className="app-content">
      <Sidebar/>
      
      <Routes>
        <Route path='/add' element={<Add url={url}/>}/>
        <Route path='/addres' element={<Addres url={url}/>}/>
        <Route path='/list' element={<List url={url}/>}/>
        <Route path='/listres' element={<Listres url={url}/>}/>
        <Route path='/orders' element={<Orders url={url}/>}/>
        <Route path='/showmax' element={<Showmax/>}/>
      </Routes>
    </div>

    </div>
    </Router>

  );
}

export default App;








