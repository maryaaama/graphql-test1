import React from 'react';
import './App.css';
import {useRoutes} from 'react-router-dom';
import routes from './routes';
import TopBar from './component/TopBar/TopBar';
import Sidbar from './component/sidbar/Sidbar';
import Grid from '@mui/material/Grid';

function App (){

 let router = useRoutes(routes)
    
  return (
  <>
  <TopBar></TopBar>
  <Grid  container spacing={2} columns={16}>
  <Grid item xs={4}> <Sidbar/> </Grid>
  <Grid item xs={12}> {router}  </Grid>
  </Grid>   
  </>

  )
      }    
export default App;
