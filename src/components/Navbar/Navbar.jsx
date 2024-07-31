import {
  AppBar, Toolbar,  Typography,  List, ListItem, Container, Stack,
  Avatar} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import logo from '/logo.gif'
import ThemeSelector from '../ThemeSelector.jsx';

function Navbar() {
  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' },
  ];

  const navigate = useNavigate(); // Added useNavigate hook

  const handleLogoClick = () => {
    navigate('/'); // Navigate to '/' when logo is clicked
  };

  return (
    <AppBar sx={{ backgroundColor: 'transparent', border: 'none', backgroundImage: 'none' }} elevation={0} position="static">
      <Toolbar component={Container} sx={{justifyContent:'space-between',my:2}}>
      <Stack color={'black'}>
          <Avatar variant='square' src={logo} alt="SWeEts Logo" sx={{ height: '62px', width: '62px',ml:2}} onClick={handleLogoClick} /> {/* Added onClick event */}
          <Typography fontStyle={'italic'} fontSize={'large'} fontWeight={'bold'}>Re-narration</Typography>
          {/* <Typography sx={{fontWeight:'semibold',fontSize:{xs:8, md:12}}}>Semantic Web Entities</Typography> */}
          </Stack>
        <ThemeSelector />
        <List sx={{ display: { xs: 'none', md: 'flex' } }}>
          {menuItems.map((item, index) => (
            <ListItem key={index}>
              <Link style={{ textDecoration: 'none', color: 'black',fontFamily:'Roboto' }} to={item.href}>{item.text}</Link>
            </ListItem>
          ))}
        </List>
        <Link to="/about" style={{ textDecoration: 'none', color: 'black', fontFamily: 'Roboto' }}>Documentation</Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
