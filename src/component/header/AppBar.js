import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container'
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';

import LogoutModal from '../LogoutModal';
import useAuth from '../../hooks/auth';

export default function MenuAppBar() {
  const {user, logout} = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMenuProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseLogout = ()=>{
    setOpen(false)
  }
  const handleLogout = ()=>{
    handleCloseLogout()
    logout()
  }
  const handleClickLogout = ()=>{
    handleCloseMenu()
    setOpen(true)
  }

  return (
    <>
      <AppBar position="fixed" color='inherit' sx={{boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',}}>
        <Container>
        <Toolbar disableGutters>
          <Link href='/' >
          <a style={{width:'90px'}}>
            <Image 
              src={ "/njien_poultry_logo.png"}
              alt="Njien poultry logo"
              width={994}
              height={498}
            />
          </a>
          </Link>
          <div style={{flexGrow: 1}}></div>
          {/* <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuProfile}
              color="inherit"
            >
              <AccountCircle color='action' fontSize='large'/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <Typography variant='subtitle1' sx={{px:2, py:1}} >{user.email}</Typography>
              <Divider variant='middle' />
              <MenuItem onClick={handleCloseMenu}></MenuItem>
              <MenuItem onClick={handleClickLogout}><LogoutIcon style={{marginRight: '10px'}} />Logout</MenuItem>
            </Menu>
          </div> */}
          <Button
            size='small'
            onClick={handleClickLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <LogoutModal
        open={open}
        handleClose={handleCloseLogout}
        handleConfirm={handleLogout}
      />
    </>
  );
}
