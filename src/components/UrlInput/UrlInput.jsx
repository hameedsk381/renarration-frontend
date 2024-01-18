import { ArrowForward } from '@mui/icons-material';
import { Alert, Button, Paper, Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function UrlInput({navigateTo}) {
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
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for snackbar message
  const navigate = useNavigate();
   // Snackbar close handler
   const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const isValidUrl = (urlString) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/|ipfs:\\/\\/)?' + // protocol (http, https, ipfs)
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' 
    );
    return !!urlPattern.test(urlString);
  };
  

  // Handle navigation and input validation
  const handleNavigate = async() => {
    if (isValidUrl(inputValue)) {
      try {
        const response = await axios.post('https://renarration-api.onrender.com/download', { url: inputValue });
        const fileUrl = response.data.fileUrl;
  
        // Now you have the file URL, and you can pass it to the next component via state
        navigate(navigateTo, { state: { fileUrl } });
      } catch (error) {
        console.error('Error downloading the file:', error);
        setSnackbarMessage(
          <div>
            Error downloading the file.<br />
        error
          </div>
        );
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage(
        <div>
          Invalid URL.<br />
          Example: https://www.example.com
        </div>
      );
      setSnackbarOpen(true);
      setInputValue(''); 
    }
  };

  return (
   <>
    <Paper elevation={6} sx={{ width: { lg: "50%", md: "75%" }, m: 2, marginTop: "-25px", marginInline: { lg: "25%", md: "10%" } }} style={wrapperStyle} >
      <input
        type="url"
        placeholder="Enter a URL, link you want to re-narrate with"
        style={inputStyle}
        value={inputValue} // Controlled component
        onChange={(e) => setInputValue(e.target.value)}
      />
      
      <Button endIcon={<ArrowForward/>} onClick={handleNavigate} style={buttonStyle} sx={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}>
        Re-narrate now
      </Button>
    </Paper>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }} // Position Snackbar on the top-left
      >
     <Alert onClose={handleSnackbarClose}  severity="error" sx={{ width: '100%', whiteSpace: 'pre-line' }}>
       {snackbarMessage}
     </Alert>
   </Snackbar>
   </>
  );
}

export default UrlInput;
