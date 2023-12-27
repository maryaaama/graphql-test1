import React from 'react';
import Grid from '@mui/material/Grid';
import Sidbar from '../../component/sidbar/Sidbar';
export default function Home() {
  return (
    <>
  <Grid  container spacing={2} columns={16}>
  <Grid item xs={4}> <Sidbar/> </Grid>
  <Grid item xs={12}> 
  </Grid>
  </Grid>  
   
    
    </> 
  )
}