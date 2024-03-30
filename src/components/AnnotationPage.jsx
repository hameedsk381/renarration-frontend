import React, { useState } from 'react';
import {
  Alert, AlertTitle, Container, Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import axios from 'axios';
import Annotator from './Annotator';
import outlineElement from '../utils/outlineElement';
import {
  addAnnotatedBlock, removeAnnotatedBlock, resetAnnotations,
  setAnnotatedHtmlContent, toggleAnnotationMode, updateAnnotatedBlock,
} from '../redux/actions/annotationActions';
import processHtml from '../utils/processHtml';
import {
  fetchFailure, fetchStart, fetchSuccess, resetState,
} from '../redux/actions/urlActions';
import { extractApi } from '../apis/extractApis';
import getDeviceType from '../utils/getDeviceType';
import removeOutlineFromOuterHtml from '../utils/removeOutlineFromOuterHtml';
import AnnotationNavbar from './AnnotationNavbar';
import { showSnackbar } from '../redux/actions/snackbarActions';
import generateXPath from '../utils/generateXPath';
import removeOutlineFromElement from '../utils/removeOutline';

function AnnotationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const currentUrl = useSelector((state) => state.url.currentUrl);
  const initialHtmlContent = useSelector((state) => state.url.initialHtmlContent);
  const annotationHtmlContent = useSelector((state) => state.annotation.htmlforAnnotation);
  const isFetching = useSelector((state) => state.url.isFetching);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mutationErrorSnackbarOpen, setMutationErrorSnackbarOpen] = useState(false);
  const annotationMode = useSelector((state) => state.annotation.mode);
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedElementContent, setClickedElementContent] = useState({ html: '' });
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  const [currentXpath, setCurrentXpath] = useState(null); // State to hold the current xpath
  const [initialBodycontent, setInitialBodyContent] = useState();

  const handleAnnotationModeChange = () => {
    dispatch(toggleAnnotationMode()); // Dispatch toggle action
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const deleteBlock = async () => {
    // Dispatch action to delete the block
    dispatch(removeAnnotatedBlock(currentBlockId));
    if (annotationHtmlContent !== null) {
      const updatedHtmlContent = removeOutlineFromElement(annotationHtmlContent, currentBlockId);
      dispatch(setAnnotatedHtmlContent(updatedHtmlContent));
    }

    setSnackbarMessage('Block deleted successfully');
    setSnackbarOpen(true);
    setOpenDialog(false);
  };
  const handleAnnotationClick = (event) => {
    event.preventDefault();
    const elementId = event.target.dataset.id;
console.log(elementId);

    const xpath = generateXPath(event.target);
    // Check if a block with this ID already exists
    const existingBlock = annotatedBlocks.find((block) => block.target.id === elementId);
    if (existingBlock) {
      setInitialBodyContent(existingBlock.body.value);
      event.target.classList.remove('hover-effect');
      const fullHtmlWithoutOutline = removeOutlineFromOuterHtml(event.target.outerHTML);

      setClickedElementContent(fullHtmlWithoutOutline);
      setOpenDialog(true);
      setCurrentBlockId(elementId); // Set the current block ID
      setCurrentXpath(xpath);
    } else {
      event.target.classList.remove('hover-effect');
      const fullHtmlWithoutOutline = removeOutlineFromOuterHtml(event.target.outerHTML);
      setInitialBodyContent('');
      setClickedElementContent(fullHtmlWithoutOutline);
      setOpenDialog(true);
      setCurrentBlockId(elementId); // Set the current block ID
      setCurrentXpath(xpath);
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
          dispatch(showSnackbar('Content fetched successfully', 'success'));
        } catch (error) {
          dispatch(fetchFailure(error.message));
          dispatch(showSnackbar('Failed to fetch content', 'error'));
        }
      } else {
        // Handle invalid href
        dispatch(showSnackbar('Invalid URL. Example: https://www.example.com', 'info'));
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
  const createAnnotation = (pageContent, htmlContent, annotatedContent, id, url, xpathforblock) => {
    const annotation = {
      '@context': 'http://www.w3.org/ns/anno.jsonld',
      type: 'Annotation',
      motivation: 'Annotation',
      target: {
        id,
        type: 'TextualTarget',
        value: htmlContent,
        format: 'text/html',
        selector: {
          type: 'Text',
          value: `${xpathforblock}`,
        },
      },
      body: {
        type: 'TextualBody',
        value: annotatedContent,
        format: 'text/html',
      },
      source: url,
      renarrationStatus: true,
    };
    // console.log(annotation);
    dispatch(addAnnotatedBlock(annotation));
  };
  const handleSave = (htmlContent, annotationContent) => {
    // console.log(currentBlockId)
    const existingBlockIndex = 
    annotatedBlocks.findIndex((block) => block.target.id === currentBlockId);
    // console.log(existingBlockIndex);
    if (existingBlockIndex !== -1) {
      // Get the existing block
      const existingBlock = annotatedBlocks[existingBlockIndex];

      // Update the body value of the existing block
      const updatedBlock = {
        ...existingBlock,
        body: {
          ...existingBlock.body,
          value: annotationContent, // Update this with the new body value
        },
      };

      // Dispatch the action to update the annotated block
      dispatch(updateAnnotatedBlock(existingBlock.target.id, updatedBlock));
    } else {
      createAnnotation(initialHtmlContent, htmlContent, annotationContent, currentBlockId, currentUrl, currentXpath)

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

      <AnnotationNavbar
        annotationMode={annotationMode}
        handleAnnotationModeChange={handleAnnotationModeChange}
        handleExit={handleExit}
        annotatedBlocks={annotatedBlocks}
        navigateToRenarrationBlocks={navigateToRenarrationBlocks}
      />

      {!isFetching && annotationMode && (
        <Container
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
        <Container dangerouslySetInnerHTML={{ __html: initialHtmlContent }} 
        onClick={handleNavigationClick} />

      )}

      <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
        initialValue={initialBodycontent}
        onDelete={deleteBlock}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error"
         sx={{ width: '100%', whiteSpace: 'pre-line' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={mutationErrorSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setMutationErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={() => setMutationErrorSnackbarOpen(false)}
         severity="error" sx={{ width: '100%', whiteSpace: 'pre-line' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </>
  );
}

export default AnnotationPage;
