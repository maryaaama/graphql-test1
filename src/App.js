import React from 'react';
import './App.css';
import {Routes , Route} from 'react-router-dom';
import TopBar from './component/TopBar/TopBar';
import Grid from '@mui/material/Grid';
import Home from './pages/Home/Home';
 import NewJob from './pages/Jobs/NewJob.js';
 import Users from './pages/Users/UserList';
 import CreateUser from './pages/NewUser/CreateUser.js';
 import LogIn from './pages/LogIn/LogIn.js';
 import '@shopify/polaris/build/esm/styles.css';
 import {AppProvider} from '@shopify/polaris';
function App (){ 
  return (
  <>
  <AppProvider>
  <TopBar></TopBar>
  
  <Grid item xs={12}> 
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Users' element={<Users/>} />
        <Route path='/NewJob' element={<NewJob/>} />
        <Route path='/CreateUser' element={<CreateUser/>} />
        <Route path='/LogIn' element={<LogIn/>} />
    </Routes>
  </Grid>
  </AppProvider>
  </>

  )
      }    
export default App;
