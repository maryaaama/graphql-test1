import React from 'react'
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import './TopBar.css';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
 
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function () {
 
  return (
    <div className='Topbar'>

      <div className='TopbarRapper'>
      <div className='topRight'>
        <span className='log'>maryam</span>
      </div>
      <div className='topLeft'>
        <div className='topbarIcon'>
        <Stack
         direction="row"
         divider={<Divider orientation="vertical" flexItem />}
         spacing={2}
        >
      <Item className='iconColor'><Badge badgeContent={4} className='iconBadge' color="primary">
      <NotificationsNoneIcon className='icon' color="action" />
      </Badge></Item>
      <Item className='iconColor'> <Badge badgeContent={4}  className='iconBadge'  color="primary">
      <LanguageIcon color="action" className='icon'/>
       </Badge></Item>
      <Item className='iconColor'> <SettingsIcon className='icon'/></Item>
      <Link to='/LogIn'>
      <Item className='iconColor'> <Avatar src="/broken-image.jpg" className='icon' /></Item>
      </Link>
      </Stack>
        </div>

      </div>
      </div>
      
    </div>
  )
}
