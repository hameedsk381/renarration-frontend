import * as React from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import Composesweet from './Composesweet';
import Compose from './Compose';

function useLocalStorageState(key, defaultValue) {
  const [state, setState] = React.useState(() => {
    // Retrieve stored value from localStorage if available
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  // Update localStorage whenever the state changes
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default function HomeTabs({ sweets, renarrations }) {
  // Use the custom hook to keep the selected tab index consistent
  const [value, setValue] = useLocalStorageState('selectedTab', 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ width: '100%', my: 5 }}>
      <Box>
        <Tabs value={value} onChange={handleChange}  textColor='inherit' indicatorColor='primary' centered>
        <Tab  label="Renarrations"  />
          <Tab label="Sweets"  />
        </Tabs>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {value === 1 && <Composesweet />}
        {value === 0 && <Compose />}
      </Box>
    </Container>
  );
}
