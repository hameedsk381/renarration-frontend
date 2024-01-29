import React, { useState, useEffect } from 'react';
import { AppBar, Box, Breadcrumbs, Button, CircularProgress, FormControlLabel, Switch, Toolbar, Typography } from '@mui/material';
import {  Link, useNavigate } from 'react-router-dom';
import Annotator from './Annotator';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'; // Import the necessary action creators
import { resetState , resetContent } from '../redux/actions';
import UrlInput from './UrlInput/UrlInput';
import outlineElement from '../utils/outlineElement';
import removeOutlineFromElement from '../utils/removeOutline';
import { removeAnnotatedBlock, setAnnotatedHtmlContent, toggleAnnotationMode } from '../redux/actions/annotationActions';
import { processHtml } from '../utils/processHtml';
const Renarration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const annotatedBlocks = useSelector(state => state.annotation.annotatedBlocks);
  const initialHtmlContent = useSelector(state => state.url.initialHtmlContent);
  const annotationHtmlContent = useSelector(state => state.annotation.htmlforAnnotation);
  const isFetching = useSelector(state => state.url.isFetching);
  // const history = useSelector(state => state.history.history);
  const annotationMode = useSelector(state => state.annotation.mode); // Get the annotation mode from Redux state
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedElementContent, setClickedElementContent] = useState({ html: ''});
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  
useEffect(()=>{

},[annotationMode])

// Function to remove onclicks and hrefs when annotation mode is on
// const processContentForAnnotation = (htmlContent) => {
 

//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlContent, 'text/html');
//   const allElements = doc.querySelectorAll('*');

//   allElements.forEach(el => {
//     el.removeAttribute('onclick');
//     el.removeAttribute('href');
//     // Add more attributes to remove if necessary
//   });

 
//   return doc;
// };

const handleAnnotationModeChange = () => {
  dispatch(toggleAnnotationMode()); // Dispatch toggle action
};

 


const handleAnnotationClick = (event) => {
  let elementId = event.target.dataset.id;
  let existingBlock;

  if (!elementId) {
    // If the element does not have an ID, generate a new one
    elementId = uuidv4();
    event.target.setAttribute('data-id', elementId); // Assign the ID to the element's data-id attribute
  }
  
  // Check if a block with this ID already exists
  existingBlock = annotatedBlocks.find(block => block.id === elementId);
if(existingBlock){
  dispatch(removeAnnotatedBlock(existingBlock.id));
  
  const updatedHtmlContent = removeOutlineFromElement(annotationHtmlContent,existingBlock.id);
  dispatch(setAnnotatedHtmlContent(updatedHtmlContent));
  return;
} else {
  event.target.classList.remove('hover-effect');
  const fullHtml = event.target.outerHTML;

 
  setClickedElementContent(fullHtml);
  setOpenDialog(true);
  setCurrentBlockId(elementId); // Set the current block ID
}
};
const handleNavigationClick =(event)=>{
  if ( event.target.tagName === 'A') {
    const href = event.target.getAttribute('href');
    if (href) {
        // If the annotation mode is off and it's an anchor tag, treat href as new URL input
     
     
         event.preventDefault(); // Prevent default action of the anchor tag
        return; // Skip the rest of the function
    }
}
}

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
  const existingBlockIndex = annotatedBlocks.findIndex(block => block.id === currentBlockId);

  if (existingBlockIndex !== -1) {
    // Update existing block
    dispatch(updateRenarrationBlock({
      ...annotatedBlocks[existingBlockIndex],
      content: updatedContent
      }));
  } else {
    // Add new block
    const newBlock = {
      content: updatedContent,
       id: currentBlockId || uuidv4() ,
       image: null,
  audio: null,
  video: null,
  description: null,
    };
    dispatch(addRenarrationBlock(newBlock));

    // Update the htmlContent to include the outline for the annotated element
    const updatedHtmlContent = outlineElement(htmlContent, currentBlockId);
    dispatch(updateHtmlContent(updatedHtmlContent));
}
  setOpenDialog(false);
};

const handleExit = () => {
  if (window.confirm("Are you sure you want to exit Renarration?")) {
    // dispatch(resetState()); 
    // dispatch(resetHistory()); // Reset history
    // dispatch(resetContent());// Dispatch the resetState action to clear Redux state
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
 
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'Highlight', padding: '10px',marginBottom:"7vh" }}>
      <FormControlLabel
        control={
          <Switch
            checked={annotationMode}
            onChange={handleAnnotationModeChange}
            color="primary"
          />
        }
        label="Annotation Mode"
      />
      
        <Button color='inherit' variant='outlined' onClick={handleExit}>
                        Exit Renarration
                    </Button>
       {annotatedBlocks.length !==0 &&  <Button color='inherit' variant='outlined' onClick={navigateToRenarrationBlocks}>
          View Renarration Blocks
        </Button>}
      </div>
      <UrlInput/>
      {/* <Breadcrumbs aria-label="breadcrumb">
                {history.map((url, index) => (
                    <Link key={index} color="inherit" to={url} onClick={(e) => e.preventDefault()}>
                        {url}
                    </Link>
                ))}
            </Breadcrumbs> */}
      {!isFetching && annotationMode && (
        <div  dangerouslySetInnerHTML={{ __html: annotationHtmlContent }} onClick={handleAnnotationClick}   onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut} />
      )}
      {!isFetching && !annotationMode && (
        <div dangerouslySetInnerHTML={{ __html:initialHtmlContent }} onClick={handleNavigationClick}  />
      )}
   <Annotator
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  content={clickedElementContent}
  onSave={handleSave}
/>

    </>
  );
};


export default Renarration;
