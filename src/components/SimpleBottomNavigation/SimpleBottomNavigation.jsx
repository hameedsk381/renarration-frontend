import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{
      width: '100%', // Full width
      position: 'fixed', // Fixed position
      bottom: 0, // At the bottom of the page
      left: 0, // Align to the left
      right: 0, // Align to the right
      zIndex: 1000, // High z-index to ensure it's above other content,
      display: { xs: 'block', md: 'none' },
    }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >

        <BottomNavigationAction component={Link} to="/" label="Home" icon={<RestoreIcon />} />

        <BottomNavigationAction component={Link} to="/about" label="About" icon={<RestoreIcon />} />
        <BottomNavigationAction component={Link} to="/contact" label="Contact" icon={<RestoreIcon />} />
      </BottomNavigation>

    </Box>
  );
}
