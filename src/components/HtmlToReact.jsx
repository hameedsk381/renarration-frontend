import React from 'react';
import parse from 'html-react-parser';
import { Box, Paper } from '@mui/material';
import Root from 'react-shadow/emotion'; // Import Root from react-shadow for Shadow DOM support

function HtmlToReact({ content }) {
  // Function to prepare HTML content by wrapping it in a div with a background color
  const prepareContentWithStyles = (htmlContent) => `<div style="background-color: white;">${htmlContent}</div>`;

  return (
    <Paper elevation={0} sx={{ padding: 2 }}>
      <Root.div> 
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          {parse(prepareContentWithStyles(content))}  
        </Box>
      </Root.div>
    </Paper>
  );
}

export default HtmlToReact;
