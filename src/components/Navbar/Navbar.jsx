import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, ListItemButton, Button, FormControlLabel, Switch, Select, MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { setTheme } from '../../redux/actions/themeActions.js';
import { useDispatch } from 'react-redux';
import { themes } from '../../themes/themes.js';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ThemeSelector from '../ThemeSelector.jsx';
function Navbar() {



  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' },

  ];

  return (
    <AppBar sx={{ backgroundColor: 'background.customBackground', border: 'none' }} position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1, fontSize: { xs: '20px', md: '35px' } }}>
          SWeets
        </Typography>
       <ThemeSelector/>
        <List sx={{ display: { xs: 'none', md: 'flex' } }}>
          {menuItems.map((item, index) => (
            <ListItem key={index}>
              <Link style={{ textDecoration: 'none', color: 'black' }} to={item.href}>{item.text}</Link>
            </ListItem>
          ))}
        </List>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
