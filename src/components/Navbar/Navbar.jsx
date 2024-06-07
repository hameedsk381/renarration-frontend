import {
  AppBar, Toolbar,  Typography,  List, ListItem, Container, Stack,
  Avatar} from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '/logo.png'
// import ThemeSelector from '../ThemeSelector.jsx';

function Navbar() {
  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' },

  ];

  return (
    <AppBar sx={{ backgroundColor: 'transparent', border: 'none', backgroundImage: 'none' }} elevation={0} position="static">
      <Toolbar component={Container} sx={{justifyContent:'space-between',my:2}}>
      <Stack color={'black'}>
          <Avatar variant='square' src={logo} alt="SWeEts Logo" sx={{ height: '62px', width: '62px' }} />
          {/* <Typography sx={{fontWeight:'semibold',fontSize:{xs:8, md:12}}}>Semantic Web Entities</Typography> */}
          </Stack>
        {/* <ThemeSelector /> */}
        <List sx={{ display: { xs: 'none', md: 'flex' } }}>
          {menuItems.map((item, index) => (
            <ListItem key={index}>
              <Link style={{ textDecoration: 'none', color: 'black',fontFamily:'Roboto' }} to={item.href}>{item.text}</Link>
            </ListItem>
          ))}
        </List>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
