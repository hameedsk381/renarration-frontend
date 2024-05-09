import React, { useState } from 'react';
import parse from 'html-react-parser';
import { Box, Paper } from '@mui/material';

function HtmlToReact({ content }) {


  // Apply background color by wrapping content in a div with styles
  const prepareContentWithStyles = (htmlContent) => `<div style="background-color: white;">${htmlContent}</div>`;

  // Parse with optional transformations


  return (
    <Paper elevation={0} sx={{ px: 2 }}>
      <Box sx={{ height: '100%', overflow: 'auto' }}>
        {parse(prepareContentWithStyles(content))}
      </Box>
    </Paper>
  ); ß;
}

export default HtmlToReact;
