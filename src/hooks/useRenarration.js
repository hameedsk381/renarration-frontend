// useRenarration.js
import { useState, useCallback } from 'react';
import axios from 'axios';
import { resetState } from '../redux/actions/urlActions';
import { resetAnnotations } from '../redux/actions/annotationActions';
import { addRennarationId, addRennarationTitle } from '../redux/actions/rennarationActions';

const useRenarration = ({ dispatch, navigate, renarrationTitle, renarratedBlocks, renarrationId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const submitApi = '/api/submitRenarration'; // Example API endpoint
  const updateApi = '/api/updateRenarration'; // Example API endpoint for updates

  const displaySnackbar = useCallback((message) => {
    setSnackbarMsg(message);
    setSnackbarOpen(true);
  }, []);

  const handleNext = useCallback(async () => {
    if (activeStep === 1) { // Assuming step 1 is the final step
      if (!renarrationTitle.trim()) {
        displaySnackbar('Please give the title to renarration');
        return;
      }

      const requestBody = {
        renarrationTitle,
        blocks: renarratedBlocks.map(block => ({
          content: block.content,
          id: block.id,
          desc: block.desc,
          source: block.source,
          renarrationStatus: block.renarrationStatus,
          img: block.img,
          aud: block.aud,
          vid: block.vid,
          _id: block._id, // Include only for updates
        })),
      };

      try {
        const response = await axios.post(renarrationId === '' ? submitApi : `${updateApi}/${renarrationId}`, requestBody, {
          headers: { 'Content-Type': 'application/json' },
        });
        displaySnackbar(response.data.message);
        navigate('/'); // Navigate to the home page or a success page
      } catch (error) {
        displaySnackbar(`Error submitting renarration: ${error.message}`);
      }
    } else {
      setActiveStep(currentStep => currentStep + 1);
    }
  }, [activeStep, renarrationTitle, renarratedBlocks, renarrationId, displaySnackbar, navigate]);

  const handleBack = useCallback(() => {
    setActiveStep(currentStep => currentStep - 1);
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const handleExit = useCallback(() => {
    // Resetting state and clearing storage if necessary
    dispatch(resetState());
    dispatch(resetAnnotations());
    dispatch(addRennarationTitle(''));
    dispatch(addRennarationId(''))
    localStorage.clear();
    sessionStorage.clear();
    navigate('/'); // Or navigate to a specific route
  }, [navigate]);

  return {
    activeStep,
    setActiveStep,
    snackbarOpen,
    snackbarMsg,
    handleNext,
    handleBack,
    handleSnackbarClose,
    handleExit,
    displaySnackbar,
  };
};

export default useRenarration;
