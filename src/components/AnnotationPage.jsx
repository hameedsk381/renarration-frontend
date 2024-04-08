import React, { useState } from 'react';
import {
  Alert, AlertTitle, Button, Container, Paper, Snackbar, Stack,
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
import { ArrowForward, ExitToApp } from '@mui/icons-material';
import { closeModal, openModal } from '../redux/actions/modalActions';
import Confirmation from '../utils/Confirmation';




function AnnotationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const currentUrl = useSelector((state) => state.url.currentUrl);
  const initialHtmlContent = useSelector((state) => state.url.initialHtmlContent);
  const annotationHtmlContent = useSelector((state) => state.annotation.htmlforAnnotation);
  const isFetching = useSelector((state) => state.url.isFetching);
  const annotationMode = useSelector((state) => state.annotation.mode);
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedElementContent, setClickedElementContent] = useState({ html: '' });
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  const [currentXpath, setCurrentXpath] = useState(null); // State to hold the current xpath
  const [initialBodycontent, setInitialBodyContent] = useState();
  const [tags,setTags] = useState([]);
const [title,setTitle] = useState('')
  const handleAnnotationModeChange = () => {
    dispatch(toggleAnnotationMode()); // Dispatch toggle action
  };

  const deleteBlock = async () => {
    // Dispatch action to delete the block
    dispatch(removeAnnotatedBlock(currentBlockId));
    if (annotationHtmlContent !== null) {
      const updatedHtmlContent = removeOutlineFromElement(annotationHtmlContent, currentBlockId);
      dispatch(setAnnotatedHtmlContent(updatedHtmlContent));
    }
    dispatch(showSnackbar('Block deleted successfully', 'success'));
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
      setTags(existingBlock.tags);
      setTitle(existingBlock.body.title);
      console.log(existingBlock.tags)
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
      setTags([]);
      setTitle('')
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
  const createAnnotation = (pageContent, htmlContent, annotatedContent, id, url, xpathforblock,tags,anntitle) => {
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
        title:anntitle,
        value: annotatedContent,
        format: 'text/html',
      },
      source: url,
      tags:tags,
      renarrationStatus: true,
      position: { x: 0, y: 0 }
    };
    
    // console.log(annotation);
    dispatch(addAnnotatedBlock(annotation));
  };
  const handleSave = (htmlContent, annotationContent,tags,anntitle) => {
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
        tags:tags,
        body: {
          ...existingBlock.body,
          title:anntitle,
          value: annotationContent, // Update this with the new body value
        },
      };

      // Dispatch the action to update the annotated block
      dispatch(updateAnnotatedBlock(existingBlock.target.id, updatedBlock));
    } else {
      createAnnotation(initialHtmlContent, htmlContent, annotationContent, currentBlockId, currentUrl, currentXpath,tags,anntitle)

      // Update the htmlContent to include the outline for the annotated element
      const updatedHtmlContent = outlineElement(annotationHtmlContent, currentBlockId);
      dispatch(setAnnotatedHtmlContent(updatedHtmlContent));
    }
    setOpenDialog(false);
  };

  const handleExit = () => {
      dispatch(openModal(<Confirmation/>));
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
        <Container sx={{my:3}}
          dangerouslySetInnerHTML={{ __html: processHtml(annotationHtmlContent) }}
          onClick={handleAnnotationClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      )}
      {initialHtmlContent === null && (
        <Container sx={{p:3}}>
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
   <Stack direction={'row'} justifyContent={'space-around'} position={'fixed'} bottom={0} width={'100%'} bgcolor={'white'} py={2} component={Paper} elevation={5}>
         
 <Button variant='outlined' endIcon={<ExitToApp />} onClick={handleExit} color="error" sx={{ fontSize: { xs: 8, md: 14 } }}>
           exit renarration
         </Button>
         
        <Button variant='contained'  endIcon={<ArrowForward />} onClick={navigateToRenarrationBlocks} color="success" sx={{ fontSize: { xs: 8, md: 14 },display:!annotationMode ? 'none' : 'flex' }} disabled={annotatedBlocks.length === 0 }  >
           View Renarrated blocks
         </Button>
      
         
         
       </Stack>
      <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
        initialValue={initialBodycontent}
        annotatedtags={tags}
        onDelete={deleteBlock}
        title={title}
      />
     

    </>
  );
}

export default AnnotationPage;
