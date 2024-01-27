// useFetchAndProcessContent.js
import { useMutation } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  fetchHtmlStart,
  fetchHtmlSuccess,
  fetchHtmlFailure,
  updateProgress,
  resetProgress,
} from '../redux/actions'; // Adjust the path to your action creators

export const useFetchAndProcessContent = (urlToDownload) => {
  const dispatch = useDispatch();

  const mutation = useMutation(
    (urlToDownload) => {
      console.log("started fetching");
      dispatch(fetchHtmlStart()); // Dispatch action with useDispatch

      return axios.post('http://localhost:2000/download', { url: urlToDownload }, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(updateProgress(percentCompleted)); // Dispatch progress update
        }
      });
    },
    {
      onSuccess: (response) => {
        dispatch(fetchHtmlSuccess(response.data)); // Dispatch action with useDispatch
        console.log('Received HTML content:', response.data);
        // navigate(navigateTo); // You might want to pass a callback instead of using navigate here

        dispatch(resetProgress()); // Reset progress
      },
      onError: (error) => {
        dispatch(fetchHtmlFailure(error.message)); // Dispatch action with useDispatch
        // Handle error, maybe set a local state for error message here
        dispatch(resetProgress()); // Reset progress
      },
    }
  );

  return mutation(urlToDownload);
};
