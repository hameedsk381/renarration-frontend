import React, { useState, useEffect } from 'react';
import {
  Alert, AlertTitle, Button, Chip, Container, FormControlLabel, Snackbar, Switch, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'; // Import the necessary action creators
import axios from 'axios';
import Annotator from './Annotator';
import UrlInput from './UrlInput/UrlInput';
import outlineElement from '../utils/outlineElement';
import removeOutlineFromElement from '../utils/removeOutline';
import {
  addAnnotatedBlock, removeAnnotatedBlock, resetAnnotations, setAnnotatedHtmlContent, toggleAnnotationMode, updateAnnotatedBlock,
} from '../redux/actions/annotationActions';
import { processHtml } from '../utils/processHtml';
import {
  fetchFailure, fetchStart, fetchSuccess, resetState,
} from '../redux/actions/urlActions';
import { extractApi, sweetsbyurl } from '../apis/extractApis';
import getDeviceType from '../utils/getDeviceType';
import { removeOutlineFromOuterHtml } from '../utils/removeOutlineFromOuterHtml';
import AnnotationNavbar from './AnnotationNavbar';

function AnnotationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const history = useSelector((state) => state.url.history);
  const currentUrl = useSelector((state) => state.url.currentUrl);
  const initialHtmlContent = useSelector((state) => state.url.initialHtmlContent);
  const annotationHtmlContent = useSelector((state) => state.annotation.htmlforAnnotation);
  const isFetching = useSelector((state) => state.url.isFetching);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mutationErrorSnackbarOpen, setMutationErrorSnackbarOpen] = useState(false);
  const annotationMode = useSelector((state) => state.annotation.mode); // Get the annotation mode from Redux state
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedElementContent, setClickedElementContent] = useState({ html: '' });
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  const [urlsweets, setUrlsweets] = useState(0);
  useEffect(() => {
    fetchResponse(),
    console.log(initialHtmlContent);
  }, [currentUrl]);
  const fetchResponse = async () => {
    try {
      const response = await axios.post(sweetsbyurl, { source: currentUrl });
      setUrlsweets(response.data.length);
      // Handle the response as needed
    } catch (error) {
      // Handle any errors from the fetch
    }
  };

  const handleAnnotationModeChange = () => {
    dispatch(toggleAnnotationMode()); // Dispatch toggle action
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAnnotationClick = (event) => {
    event.preventDefault();
    let elementId = event.target.dataset.id;

    if (!elementId) {
    // If the element does not have an ID, generate a new one
      elementId = uuidv4();
      event.target.setAttribute('data-id', elementId); // Assign the ID to the element's data-id attribute
    }

    // Check if a block with this ID already exists
    const existingBlock = annotatedBlocks.find((block) => block.id === elementId);
    if (existingBlock) {
      dispatch(removeAnnotatedBlock(existingBlock.id));
      const updatedHtmlContent = removeOutlineFromElement(annotationHtmlContent, existingBlock.id);
      dispatch(setAnnotatedHtmlContent(updatedHtmlContent));
    } else {
      event.target.classList.remove('hover-effect');
      const fullHtmlWithoutOutline = removeOutlineFromOuterHtml(event.target.outerHTML);

      setClickedElementContent(fullHtmlWithoutOutline);
      setOpenDialog(true);
      setCurrentBlockId(elementId); // Set the current block ID
    }
  };

  const handleNavigationClick = async (event) => {
    event.preventDefault(); // Prevent default navigation
    // Check if the clicked element is an anchor tag
    if (event.target.tagName === 'A') {
      const href = event.target.getAttribute('href');

      // If href exists and is valid, perform operations without navigation
      if (href) {
        // Stop the event from propagating further
        // console.log("URL to fetch:", href);

        try {
          dispatch(fetchStart());
          const response = await axios.post(extractApi, { url: href }, { headers: { 'User-Agent': getDeviceType() } });
          dispatch(fetchSuccess(href, response.data));
          dispatch(setAnnotatedHtmlContent(response.data));
        } catch (error) {
          dispatch(fetchFailure(error.message));
          setSnackbarMessage(`Failed to fetch content: ${error.message}`);
          setSnackbarOpen(true);
          setInputValue('');
        }
      } else {
        // Handle invalid href
        setSnackbarMessage('Invalid URL. Example: https://www.example.com');
        setSnackbarOpen(true);
      }
    }
    // If not an anchor tag or href is empty, let default behavior occur
    // console.log("Not an anchor tag or no href, default click behavior.");
  };

  const handleMouseOver = (event) => {
  // Prevent event from affecting parent elements
    event.stopPropagation();
    event.target.classList.add('hover-effect');
  };

  const handleMouseOut = (event) => {
    event.stopPropagation();
    event.target.classList.remove('hover-effect');
  };
  const handleSave = (updatedContent) => {
    const existingBlockIndex = annotatedBlocks.findIndex((block) => block.id === currentBlockId);

    if (existingBlockIndex !== -1) {
    // Update existing block
      dispatch(updateAnnotatedBlock({
        ...annotatedBlocks[existingBlockIndex],
        content: updatedContent,
      }));
    } else {
    // Add new block
      const newBlock = {
        content: updatedContent,
        id: currentBlockId || uuidv4(),
        img: null,
        aud: null,
        vid: null,
        desc: null,
        renarrationStatus: false,
        source: currentUrl,
      };
      dispatch(addAnnotatedBlock(newBlock));

      // Update the htmlContent to include the outline for the annotated element
      const updatedHtmlContent = outlineElement(annotationHtmlContent, currentBlockId);
      dispatch(setAnnotatedHtmlContent(updatedHtmlContent));
    }
    setOpenDialog(false);
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit Renarration?')) {
      dispatch(resetState());
      dispatch(resetAnnotations());

      localStorage.clear(); // Clear local storage
      sessionStorage.clear(); // Clear session storage (if you use it)
      navigate('/'); // Navigate to the home page or any other page
    }
  };
  const navigateToRenarrationBlocks = () => {
    navigate('/create-rennaration');
  };

  return (
    <>

      <AnnotationNavbar annotationMode={annotationMode} handleAnnotationModeChange={handleAnnotationModeChange} handleExit={handleExit} annotatedBlocks={annotatedBlocks} navigateToRenarrationBlocks={navigateToRenarrationBlocks} />

      {/* <UrlInput /> */}
      <Typography>
        No of sweets for this url :
        <Chip label={urlsweets && urlsweets} variant="filled" />
      </Typography>
      {!isFetching && annotationMode && (
        <div
          dangerouslySetInnerHTML={{ __html: processHtml(annotationHtmlContent) }}
          onClick={handleAnnotationClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      )}
      {initialHtmlContent === null && (
        <Container>
          <Alert severity="info">
            <AlertTitle>URL</AlertTitle>
            copy the url of any web page and paste it above to renarrate
          </Alert>
        </Container>
      )}
      {!isFetching && !annotationMode && (
        <div dangerouslySetInnerHTML={{ __html: initialHtmlContent }} onClick={handleNavigationClick} />
      )}

      <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
      />
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

export default AnnotationPage;
