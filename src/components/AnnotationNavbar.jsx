import React from 'react';
import {
  Box, FormControlLabel, Switch, Button, Grid,
} from '@mui/material';

function AnnotationNavbar({
  annotationMode, handleAnnotationModeChange, handleExit, navigateToRenarrationBlocks, annotatedBlocks,
}) {
  return (
    <Box sx={{ p: 2, mb: 4, backgroundColor: 'grey.100' }}>
      <Grid container alignItems="center" spacing={2} justifyContent="space-between">
        <Grid item xs={12} sm="auto" sx={{ flexGrow: 1 }}>
          <FormControlLabel
            control={<Switch checked={annotationMode} onChange={handleAnnotationModeChange} color="primary" />}
            label="Annotation Mode"
          />
        </Grid>
        {annotatedBlocks.length !== 0 && (
        <Grid item>
          <Button variant="contained" size="small" onClick={navigateToRenarrationBlocks} sx={{ textTransform: 'none' }}>
            View Renarration Blocks
          </Button>
        </Grid>
        )}
        <Grid item>
          <Button variant="contained" size="small" onClick={handleExit} sx={{ textTransform: 'none' }}>
            Exit Renarration
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
}
export default AnnotationNavbar;
