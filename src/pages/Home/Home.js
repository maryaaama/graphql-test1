import React from 'react';
import { Link } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import './Home.css';
export default function Home() {
  return (
    
     <div className='countainer'>
  <Link to='/CreateUser'> 
  <PersonAddAltIcon />
  <ListItemText primary="CreateUser" />

  </Link>
   </div>  
  
  )
}

