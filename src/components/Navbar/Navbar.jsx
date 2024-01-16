import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const menuItems = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
        { text: 'Contact', href: '/contact' },
    ];

    return (
        <AppBar  sx={{backgroundColor:'#C1BEBE',border:"none"}} position="static">
            <Toolbar>
                <Typography  sx={{ flexGrow: 1, fontSize: { xs: '20px', md: '35px' }}}>
                  SWeets
                </Typography>
             
                    <List sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {menuItems.map((item, index) => (
                            <ListItem key={index}>
                            <Link style={{textDecoration:"none",color:"black"}} to={item.href}>{item.text}</Link>
                            </ListItem>
                        ))}
                    </List>
              
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
