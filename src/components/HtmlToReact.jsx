import React, { useState } from 'react';
import parse from 'html-react-parser';
import { Box, Paper } from '@mui/material';

function HtmlToReact({ content }) {


  // Apply background color by wrapping content in a div with styles
  const prepareContentWithStyles = (htmlContent) => `<div style="background-color: white;">${htmlContent}</div>`;

  // Parse with optional transformations
  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.id === 'specificId') {
        return (
          <div style={{ color: 'red' }}>
            {parse(domNode.children[0].data)}
          </div>
        );
      }
    },
  };

  return (
    <Paper elevation={0} sx={{ px: 2, mt: 2 }}>
      <Box sx={{ height: '100%', overflow: 'auto' }}>
        {parse(prepareContentWithStyles(content), options)}
      </Box>
    </Paper>
  ); ß;
}

export default HtmlToReact;
