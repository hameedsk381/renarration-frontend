import React, { useState, useEffect } from 'react';
import {
  Alert, Button, CircularProgress, Paper, Snackbar, Box, Typography, LinearProgress,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useUrlValidation } from '../../hooks/useUrlValidation';
import { wrapperStyle, inputStyle, buttonStyle } from './UrlInputStyles';
import { fetchFailure, fetchStart, fetchSuccess } from '../../redux/actions/urlActions';
import { extractApi } from '../../apis/extractApis';
import { setAnnotatedHtmlContent } from '../../redux/actions/annotationActions';
import getDeviceType from '../../utils/getDeviceType';
import { showSnackbar } from '../../redux/actions/snackbarActions';

function UrlInput({ navigateTo }) {
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mutationErrorSnackbarOpen, setMutationErrorSnackbarOpen] = useState(false);
  const progress = useSelector((state) => state.url.progress);
  const isFetching = useSelector((state) => state.url.isFetching); // Get state with useSelector
  const errorMessage = useSelector((state) => state.url.errorMessage); // Get state with useSelector
  const dispatch = useDispatch(); // Get dispatch function with useDispatch

  const navigate = useNavigate();
  const isValidUrl = useUrlValidation(inputValue);

  const displaySnackbar = (message, type) => {
    dispatch(showSnackbar(message, type));
  };

  const handleNavigate = async () => {
    if (!isValidUrl) {
      displaySnackbar('Invalid URL. Example: https://www.example.com', 'error');
      return; // Exit early if the URL is not valid
    }

    dispatch(fetchStart());

    try {
      const response = await axios.post(extractApi, { url: inputValue }, { headers: getDeviceType });
      dispatch(fetchSuccess(inputValue, response.data));
      dispatch(setAnnotatedHtmlContent(response.data));
      navigate(navigateTo);
    } catch (err) {
      dispatch(fetchFailure(err.message));
      displaySnackbar(err.message, 'error');
      setInputValue(''); // Consider keeping the input for user correction instead of clearing
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (inputValue !== '' && event.key === 'Enter') {
        handleNavigate();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleNavigate]);

  return (
    <Paper
      elevation={6}
      sx={{
        width: { lg: '50%', md: '75%' }, m: 2, marginTop: '-25px', marginInline: { lg: '25%', md: '10%' },
      }}
      style={wrapperStyle}
    >

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
        endIcon={isFetching ? <CircularProgress value={progress} size={24} color="inherit" /> : <ArrowForward />}
        onClick={handleNavigate}
        style={buttonStyle}
        sx={{
          borderTopLeftRadius: 0, borderBottomLeftRadius: 0, bgcolor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' },
        }}
        disabled={isFetching}
      >
        Renarrate-now
      </Button>
    </Paper>
  );
}

export default UrlInput;
