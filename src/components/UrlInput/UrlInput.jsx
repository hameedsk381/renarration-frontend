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
import { fetchFailure, fetchStart, fetchSuccess, setCurrentUrl } from '../../redux/actions/urlActions';
import { extractApi } from '../../apis/extractApis';
import { setAnnotatedHtmlContent } from '../../redux/actions/annotationActions';
import getDeviceType from '../../utils/getDeviceType';
import { showSnackbar } from '../../redux/actions/snackbarActions';

function UrlInput({ navigateTo, homepage, annotationNav ,renarration}) {
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
const handleCompose = ()=>{
  if (!isValidUrl) {
    displaySnackbar('Invalid URL. Example: https://www.example.com', 'error');
    return; // Exit early if the URL is not valid
  }
  dispatch(setCurrentUrl(inputValue));
  navigate(navigateTo)
}
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
      {annotationNav && 
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
            placeholder="Add a URL you want to annotate"
            size="small"
            disableUnderline
            sx={{ width: '289px', color: 'white',borderBottom:"1px solid white"  }}
          />
        </Box>}
       { homepage &&  <Paper
          
sx={{ width: { xs: '320px', sm: '600px', md: '800px' } }}
        style={wrapperStyle}
      >

        <input
          type="url"
          placeholder="Enter a URL to create a sweet now"
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
          Sweet now
        </Button>
      </Paper>}
       {renarration && <Paper
          
          sx={{ width: { xs: '320px', sm: '600px', md: '800px' } }}
          style={wrapperStyle}
        >
  
          <input
            type="url"
            placeholder="Enter a URL to Re-narrate now"
            style={{ ...inputStyle, backgroundColor: '#D9D9D9' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCompose();
              }
            }}
          />
  
          <Button
            endIcon={isFetching ? <CircularProgress value={progress} size={24} color="inherit" /> : <ArrowForward />}
            onClick={handleCompose}
            variant='contained'
            style={buttonStyle}
            sx={{
              borderTopLeftRadius: 0, borderBottomLeftRadius: 0,textTransform:'initial',fontWeight:'semibold'
            }}
            disabled={isFetching}
          
          >
            Re-narrate now
          </Button>
        </Paper>}
       

    </>

  );
}
UrlInput.propTypes = {
  navigateTo: PropTypes.string, // Add props validation
};
export default UrlInput;
