import {
  AppBar, Toolbar,  Typography,  List, ListItem, Container} from '@mui/material';
import { Link } from 'react-router-dom';

// import ThemeSelector from '../ThemeSelector.jsx';

function Navbar() {
  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' },

  ];

  return (
    <AppBar sx={{ backgroundColor: '#C1BEBE', border: 'none', backgroundImage: 'none' }} elevation={0} position="static">
      <Toolbar component={Container}>
        <Typography sx={{ flexGrow: 1, fontSize: { xs: '20px', md: '35px',color:"black" } }}>
          SWeets
        </Typography>
        {/* <ThemeSelector /> */}
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
