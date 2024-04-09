import React, { useState, useEffect } from 'react';
import {
  Box, Button, CircularProgress, IconButton, Input, Paper,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import useUrlValidation from '../../hooks/useUrlValidation';
import { wrapperStyle, inputStyle, buttonStyle } from './UrlInputStyles';
import { fetchFailure, fetchStart, fetchSuccess } from '../../redux/actions/urlActions';
import { extractApi } from '../../apis/extractApis';
import { setAnnotatedHtmlContent } from '../../redux/actions/annotationActions';
import getDeviceType from '../../utils/getDeviceType';
import { showSnackbar } from '../../redux/actions/snackbarActions';

function UrlInput({ navigateTo, homepage, annotationNav }) {
  const [inputValue, setInputValue] = useState('');
  const progress = useSelector((state) => state.url.progress);
  const isFetching = useSelector((state) => state.url.isFetching);
  const dispatch = useDispatch();
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

  

    try {
      dispatch(fetchStart());
      const response = await axios.post(
        extractApi,
        { url: inputValue }
      );
      console.log(response.data);
      dispatch(fetchSuccess(inputValue, response.data));
      dispatch(setAnnotatedHtmlContent(response.data));
      dispatch(showSnackbar('Content fetched successfully', 'success'));
      { navigateTo && navigate(navigateTo); }
      setInputValue('');
    } catch (err) {
      dispatch(fetchFailure(err.message));
      displaySnackbar(err.message, 'error');
      setInputValue('');
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
    <>
      {annotationNav ? (
        <Box  px={1.5} py={1} sx={{ mt: { xs: 2, md: 0 } }}>
          <Input 
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleNavigate();
              }
            }}
            value={inputValue}
            endAdornment={(
              <IconButton
                onClick={handleNavigate}
                disabled={isFetching}
                size='small'
              >
                {isFetching ? <CircularProgress value={progress} size={24} color="inherit" />
                 : <ArrowForward sx={{color:'white'}} />}
              </IconButton>
)}
            placeholder="Add a URL you want to renarrate"
            size="small"
            disableUnderline
            sx={{ width: '289px', color: 'white',borderBottom:"1px solid white"  }}
          />
        </Box>
      ) : (
        <Paper
          
          sx={{
        width:{xs:'90%',md:'78%'},
         margin:'auto'
          }}
          style={wrapperStyle}
        >

          <input
            type="url"
            placeholder="Enter a URL, link you want to re-narrate with"
            style={{ ...inputStyle, backgroundColor: '#D9D9D9' }}
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
            variant='contained'
            style={buttonStyle}
            sx={{
              borderTopLeftRadius: 0, borderBottomLeftRadius: 0,textTransform:'initial',fontWeight:'semibold'
            }}
            disabled={isFetching}
          
          >
            Re-narrate now
          </Button>
        </Paper>
      ) }

    </>

  );
}
UrlInput.propTypes = {
  navigateTo: PropTypes.string, // Add props validation
};
export default UrlInput;
