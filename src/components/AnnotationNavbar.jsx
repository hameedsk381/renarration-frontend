import React from 'react';
import {
  FormControlLabel, Switch,
   Button, AppBar, Toolbar,
    Stack,  Container, 
} from '@mui/material';
import { ArrowForward, ExitToApp } from '@mui/icons-material';
import UrlInput from './UrlInput/UrlInput';
import SweetsMenu from './SweetsMenu';
function AnnotationNavbar({
  annotationMode,
  handleAnnotationModeChange
}) {
  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar component={Container} sx={{ justifyContent: 'space-between', p: 1, flexDirection: { xs: 'column', md: 'row' } }}>
       
      <FormControlLabel
            color="text.secondary"
            control={<Switch sx={{
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'white',
              },
            }} checked={annotationMode} onChange={handleAnnotationModeChange} color="info" />}
            label={annotationMode ? 'Renarration mode is on' : 'Renarration mode  is off'}
          />
        <SweetsMenu  />
        <UrlInput annotationNav />
      </Toolbar>

    </AppBar>
  );
}
export default AnnotationNavbar;
