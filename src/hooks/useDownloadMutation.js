// useDownloadMutation.js

import { useMutation } from 'react-query';
import axios from 'axios';

export const useDownloadMutation = (navigateTo, navigate, setSnackbarMessage, setMutationErrorSnackbarOpen) => {
  return useMutation(async (urlToDownload) => {
    return axios.post('https://renarration-api.onrender.com/download', { url: urlToDownload });
  }, {
    onSuccess: (data) => {
      // Navigate with the file URL received from the server
      const fileUrl = data.data.fileUrl;
      navigate(navigateTo, { state: { fileUrl } });
    },
    onError: (error) => {
      console.error('Error downloading the file:', error);
      setSnackbarMessage(`Error: ${error.response ? error.response.data : error.message}`);
      setMutationErrorSnackbarOpen(true);
    }
  });
};
