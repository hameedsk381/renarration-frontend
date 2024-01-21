import React, { useState } from 'react';
import { Alert, Button, CircularProgress, Paper, Snackbar, Box, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { wrapperStyle, inputStyle, buttonStyle } from './UrlInputStyles';
import { useUrlValidation } from '../../hooks/useUrlValidation';
import { useMutation } from 'react-query';
import axios from 'axios';
function UrlInput({ navigateTo }) {
    const [inputValue, setInputValue] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [mutationErrorSnackbarOpen, setMutationErrorSnackbarOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const isValidUrl = useUrlValidation(inputValue);
    const useDownloadMutation = (
      navigateTo,
      navigate,
      setSnackbarMessage,
      setMutationErrorSnackbarOpen,
      setProgress,
    ) => {
      return useMutation(async (urlToDownload) => {
        return axios.post('https://renarration-api.onrender.com/download', { url: urlToDownload }, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted / 100);
          },
        });
      }, {
        onSuccess: (response) => {
          console.log('Received HTML content:', response.data); // Temporarily log the received data
          const htmlContent = response.data;
          navigate(navigateTo, { state: { htmlContent } });
        },
        
        onError: (error) => {
          console.error('Error downloading the file:', error);
          setSnackbarMessage(`Error: ${error.response ? error.response.data : error.message}`);
          setMutationErrorSnackbarOpen(true);
        }
      });
    };
    
    const mutation = useDownloadMutation(navigateTo, navigate, setSnackbarMessage, setMutationErrorSnackbarOpen, setProgress);


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleNavigate = () => {
        if (isValidUrl) {
            mutation.mutate(inputValue);
            setInputValue('');
        } else {
            setSnackbarMessage("Invalid URL. Example: https://www.example.com");
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Paper elevation={6} sx={{ width: { lg: "50%", md: "75%" }, m: 2, marginTop: "-25px", marginInline: { lg: "25%", md: "10%" } }} style={wrapperStyle}>
                <input
                    type="url"
                    placeholder="Enter a URL, link you want to re-narrate with"
                    style={inputStyle}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <Button
                    endIcon={mutation.isLoading ? <CircularProgress size={24} color="inherit" value={progress * 100} /> : <ArrowForward />}
                    onClick={handleNavigate}
                    style={buttonStyle}
                    sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    disabled={mutation.isLoading}
                >
                   Renarrate-now
                </Button>
            </Paper>
            <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
>
    <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%', whiteSpace: 'pre-line' }}>
        {snackbarMessage}
    </Alert>
</Snackbar>

<Snackbar
    open={mutationErrorSnackbarOpen}
    autoHideDuration={6000}
    onClose={() => setMutationErrorSnackbarOpen(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
>
    <Alert onClose={() => setMutationErrorSnackbarOpen(false)} severity="error" sx={{ width: '100%', whiteSpace: 'pre-line' }}>
        {snackbarMessage}
    </Alert>
</Snackbar>

        </>
    );
}

export default UrlInput;
