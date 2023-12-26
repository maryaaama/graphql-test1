import React from 'react'
import WorkIcon from '@mui/icons-material/Work';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Link to='/Jobs'>
      <ListItemButton>
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Jobs" />
      </ListItemButton>
      </Link>
    </div>
  )
}