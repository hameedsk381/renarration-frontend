import axios from 'axios';
import { useMutation } from 'react-query';

const fetchAndProcessContent = async (urlToDownload) => {
  try {
    // Fetch the HTML content directly from the target URL
    const response = await axios.get(urlToDownload, {
      headers: {
        'User-Agent': navigator.userAgent // or deviceType if you already have it
      }
    });

    // Return the HTML content
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch HTML content: ' + error.message);
  }
};

export const useFetchAndProcessContent = (navigateTo, dispatch, setSnackbarMessage, setInputValue) => {
  return useMutation(
    fetchAndProcessContent,
    {
      // When HTML content is fetched successfully, send it to the server for processing
      onSuccess: async (htmlContent) => {
        dispatch(fetchHtmlStart()); // Dispatch start action
        try {
          // Send the fetched HTML content to your server endpoint
          const processResponse = await axios.post('https://renarration-api.onrender.com/process', { htmlContent });

          // Dispatch success action with the processed HTML content
          dispatch(fetchHtmlSuccess(processResponse.data));

          // Navigate to the next route if necessary
          navigate(navigateTo);
        } catch (error) {
          // Handle errors in processing
          dispatch(fetchHtmlFailure(error.message));
          setSnackbarMessage(error.message);
        }
        dispatch(resetProgress()); // Reset progress after processing
      },
      onError: (error) => {
        // Handle errors in fetching HTML content
        dispatch(fetchHtmlFailure(error.message));
        setSnackbarMessage(error.message);
        setInputValue('');
        dispatch(resetProgress()); // Reset progress on error
      },
      onMutate: () => {
        dispatch(fetchHtmlStart()); // Dispatch start action when mutation starts
      }
    }
  );
};
