import React from 'react';
import './App.css';
import {Routes , Route} from 'react-router-dom';
import TopBar from './component/TopBar/TopBar';
import Grid from '@mui/material/Grid';
import Home from './pages/Home/Home';
 import Jobs from './pages/Jobs/Jobs.js';
 import Users from './pages/Users/UserList';
 import CreateUser from './pages/NewUser/CreateUser.js';
 import LogIn from './pages/LogIn/LogIn.js';
 import { Link } from 'react-router-dom';
 import ListItemText from '@mui/material/ListItemText';

function App (){ 
  return (
  <>
  <TopBar></TopBar>
  
  <Grid item xs={12}> 
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Users' element={<Users/>} />
        <Route path='/Jobs' element={<Jobs/>} />
        <Route path='/CreateUser' element={<CreateUser/>} />
        <Route path='/LogIn' element={<LogIn/>} />
    </Routes>
  </Grid>
    
  </>

  )
      }    
export default App;
