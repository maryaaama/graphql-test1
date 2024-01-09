import React from 'react';
import './App.css';
import {Routes , Route} from 'react-router-dom';
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
 
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Users' element={<Users/>} />
        <Route path='/NewJob' element={<NewJob/>} />
        <Route path='/CreateUser' element={<CreateUser/>} />
        <Route path='/LogIn' element={<LogIn/>} />
    </Routes>

  </AppProvider>
  </>

  )
      }    
export default App;
