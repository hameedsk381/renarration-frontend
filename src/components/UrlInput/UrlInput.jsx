import React, { useState, useEffect } from 'react';
import { Alert, Button, CircularProgress, Paper, Snackbar, Box, Typography, LinearProgress } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { wrapperStyle, inputStyle, buttonStyle } from './UrlInputStyles';
import { useUrlValidation } from '../../hooks/useUrlValidation';
import axios from 'axios';

import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFailure, fetchStart, fetchSuccess } from '../../redux/actions/urlActions';
import { extractApi } from '../../apis/extractApis';
import { setAnnotatedHtmlContent } from '../../redux/actions/annotationActions';

function UrlInput({ navigateTo }) {
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mutationErrorSnackbarOpen, setMutationErrorSnackbarOpen] = useState(false);
  const progress = useSelector(state => state.url.progress);
  const isFetching = useSelector(state => state.url.isFetching); // Get state with useSelector
  const initialHtmlContent = useSelector(state => state.url.htmlContent);
  const annotatedHtmlContent = useSelector(state => state.annotation.htmlforAnnotation); // Get state with useSelector
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
  // const mutation = useMutation(
  //   async (urlToDownload) => {
  //     console.log("started fetching");
  //     dispatch(fetchHtmlStart())

  //     return await axios.post('http://localhost:2000/download', { url: urlToDownload,device: deviceType}, {
  //       onUploadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //         dispatch(updateProgress(percentCompleted)); // Dispatch progress update
  //       }
  //     });
  //   },
  //   {
  //     onSuccess: (response) => {
  //       dispatch(fetchHtmlSuccess(response.data)); // Dispatch action with useDispatch
  //       console.log('Received HTML content:', response.data);
  //       navigate(navigateTo);

  //       dispatch(resetProgress()); // Reset progress
  //     },
  //     onError: (error) => {
  //       dispatch(fetchHtmlFailure(error.message)); // Dispatch action with useDispatch
  //       setSnackbarMessage(errorMessage); // Update local snackbar message
  //       setSnackbarOpen(true); // Open error snackbar
  //       setInputValue('');
  //       dispatch(resetProgress()); // Reset progress
  //     },
  //   }
  // );

  const handleNavigate = async () => {
    if (isValidUrl) {
      console.log(inputValue)
      dispatch(fetchStart());
      await axios.post(extractApi, { url: inputValue }, { headers: navigator.userAgent }).then((res) => { dispatch(fetchSuccess(inputValue, res.data)); setAnnotatedHtmlContent(res.data); navigate(navigateTo); }).catch(err => {
        dispatch(fetchFailure(err.message)); setSnackbarMessage(errorMessage); // Update local snackbar message
        setSnackbarOpen(true); // Open error snackbar
        setInputValue('');
      });
    } else {
      setSnackbarMessage("Invalid URL. Example: https://www.example.com");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleNavigate();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleNavigate]);

  return (
    <>
      <Paper elevation={6} sx={{ width: { lg: "50%", md: "75%" }, m: 2, marginTop: "-25px", marginInline: { lg: "25%", md: "10%" } }} style={wrapperStyle}>
        <input
          type="url"
          placeholder="Enter a URL, link you want to re-narrate with"
          style={inputStyle}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleNavigate();
            }
          }}
        />

        <Button
          endIcon={isFetching ? <CircularProgress value={progress} size={24} color='inherit' /> : <ArrowForward />}
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

