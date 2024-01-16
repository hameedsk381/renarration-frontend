import { ArrowForward } from '@mui/icons-material';
import { Button, Paper } from '@mui/material';
import React from 'react';

function UrlInput() {
  const wrapperStyle = {
    display: 'flex', // Use flexbox layout
    alignItems: 'center', // Center items vertically


    flexShrink: 0, // Prevent the wrapper from shrinking
    background: '#ffffff', // Assuming a white background; change as necessary
  };

  const inputStyle = {
    flexGrow: 1, // Allow input to fill space
    border: 'none', // Remove default border
    padding: '10px', // Add some padding
    outline: 'none', // Remove the focus outline
    fontSize: 'calc(9px + (24 - 12) * ((100vw - 400px) / (1600 - 400)))',
  };

  const buttonStyle = {
    width: 'auto', // Set button width
    flexShrink: 0, // Prevent the button from shrinking
    background: '#575555', // Set the button fill color
    color: '#fff', // Set text color to white
    border: 'none', // Remove border
    cursor: 'pointer', // Change cursor on hover
    outline: 'none', // Remove the focus outline
    lineHeight: '48px', // Center text vertically by setting line height equal to button height
    whiteSpace: 'nowrap', // Prevent wrapping of text inside button
    overflow: 'hidden', // Hide overflowed text
    textOverflow: 'ellipsis', // Add an ellipsis to overflowed text
    paddingInline: "10px",
    fontSize: 'calc(9px + (24 - 12) * ((100vw - 500px) / (1900 - 100)))',
  };

  return (
    <Paper elevation={6} sx={{ width: { lg: "50%", md: "75%" }, m: 2, marginTop: "-25px", marginInline: { lg: "25%", md: "10%" } }} style={wrapperStyle} >
      <input
        type="text"
        placeholder="Enter a URL, link you want to re-narrate with"
        style={inputStyle}
      />
      <Button endIcon={<ArrowForward/>} style={buttonStyle} sx={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}>
        Re-narrate now
      </Button>
    </Paper>
  );
}

export default UrlInput;
