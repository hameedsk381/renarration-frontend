import React, { useState } from 'react';
import { Alert, Button, CircularProgress, Paper, Snackbar, Box, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { wrapperStyle, inputStyle, buttonStyle } from './UrlInputStyles';
import { useUrlValidation } from '../../hooks/useUrlValidation';
import { fetchHtmlStart ,fetchHtmlSuccess , fetchHtmlFailure} from '../../redux/actions';
import axios from 'axios';

import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
function UrlInput({ navigateTo }) {
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mutationErrorSnackbarOpen, setMutationErrorSnackbarOpen] = useState(false);


  const isFetching = useSelector(state => state.url.isFetching); // Get state with useSelector
  const errorMessage = useSelector(state => state.url.errorMessage); // Get state with useSelector
  const dispatch = useDispatch(); // Get dispatch function with useDispatch

    const navigate = useNavigate();
    const isValidUrl = useUrlValidation(inputValue);



    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
   
    const mutation = useMutation(
      (urlToDownload) => {
          console.log("started fetching");
          dispatch(fetchHtmlStart()); // Dispatch action with useDispatch
          return axios.post('https://renarration-api.onrender.com/download', { url: urlToDownload });
      },
      {
          onSuccess: (response) => {
              dispatch(fetchHtmlSuccess(response.data)); // Dispatch action with useDispatch
              console.log('Received HTML content:', response.data);
              navigate(navigateTo);
          },
          onError: (error) => {
              dispatch(fetchHtmlFailure(error.message)); // Dispatch action with useDispatch
              setSnackbarMessage(errorMessage); // Update local snackbar message
              setSnackbarOpen(true); // Open error snackbar
              setInputValue('')
          },
      }
  );
  const handleNavigate = () => {
    if (isValidUrl) {
      console.log(inputValue)
        mutation.mutate(inputValue); // Call mutate with the inputValue as argument
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
                    endIcon={isFetching ? <CircularProgress size={24} color="inherit"  /> : <ArrowForward />}
                    onClick={handleNavigate}
                    style={buttonStyle}
                    sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    disabled={isFetching}
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
