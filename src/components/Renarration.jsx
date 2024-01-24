import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, CircularProgress, Toolbar, Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import Annotator from './Annotator';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'; // Import the necessary action creators
import { addRenarrationBlock, updateHtmlContent, updateRenarrationBlock } from '../redux/actions';
import { resetState , resetContent } from '../redux/actions';
const Renarration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renarrationBlocks = useSelector(state => state.renarrationBlocks.renarrationBlocks);
  const htmlContent = useSelector(state => state.url.htmlContent);
  const isFetching = useSelector(state => state.url.isFetching);
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedElementContent, setClickedElementContent] = useState({ html: ''});
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  
useEffect(() => {
console.log(htmlContent)
}, [htmlContent]) 

function outlineElement(htmlString, dataId, outlineStyle = '2px solid red') {
  // Parse the HTML string into a DOM structure
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Find the element with the specific data-id
  const targetElement = doc.querySelector(`[data-id="${dataId}"]`);
console.log(targetElement)
  // If the element is found, modify its style to add an outline
  if (targetElement) {
    console.log("element found")
      targetElement.style.outline = outlineStyle;
      console.log(`added outlined to element ${targetElement.tagName}`)
  } else {
    console.log("element not found")
  }
  // Serialize the DOM structure back into an HTML string
  const serializer = new XMLSerializer();
  const modifiedHtmlString = serializer.serializeToString(doc);
console.log(modifiedHtmlString);
  return modifiedHtmlString;
}


const handleClick = (event) => {
  let elementId = event.target.dataset.id;
  let existingBlock;

  if (!elementId) {
    // If the element does not have an ID, generate a new one
    elementId = uuidv4();
    event.target.setAttribute('data-id', elementId); // Assign the ID to the element's data-id attribute
  }
  
  // Check if a block with this ID already exists
  existingBlock = renarrationBlocks.find(block => block.id === elementId);

  const fullHtml = event.target.outerHTML;
  const fullCss = window.getComputedStyle(event.target).cssText;
  const fullJs = event.target.getAttribute('onclick');
  setClickedElementContent({ html: fullHtml, css: fullCss, js: fullJs });
  setOpenDialog(true);
  setCurrentBlockId(elementId); // Set the current block ID
};


const handleSave = (updatedContent) => {
  const existingBlockIndex = renarrationBlocks.findIndex(block => block.id === currentBlockId);

  if (existingBlockIndex !== -1) {
    // Update existing block
    dispatch(updateRenarrationBlock({
      ...renarrationBlocks[existingBlockIndex],
      content: updatedContent
      }));
  } else {
    // Add new block
    const newBlock = {
      content: updatedContent,
       id: currentBlockId || uuidv4() // Use the current block ID if available, otherwise generate a UUID
    };
    dispatch(addRenarrationBlock(newBlock));

    // Update the htmlContent to include the outline for the annotated element
    const updatedHtmlContent = outlineElement(htmlContent, currentBlockId);
    dispatch(updateHtmlContent(updatedHtmlContent));
}
  setOpenDialog(false);
};

const handleExit = () => {
  dispatch(resetState()); 
  dispatch(resetContent());// Dispatch the resetState action to clear Redux state
  localStorage.clear(); // Clear local storage
  sessionStorage.clear(); // Clear session storage (if you use it)
  navigate('/'); // Navigate to the home page or any other page
};
  const navigateToRenarrationBlocks = () => {
    navigate('/renarration-blocks');
  };

  return (
    <>
 
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'Highlight', padding: '10px' }}>
        <div style={{ fontWeight: 'bold' }}>
          Renarration
        </div>
        <Button color='inherit' variant='outlined' onClick={handleExit}>
                        Exit Renarration
                    </Button>
       {renarrationBlocks.length !==0 &&  <Button color='inherit' variant='outlined' onClick={navigateToRenarrationBlocks}>
          View Renarration Blocks
        </Button>}
      </div>
      {isFetching && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '900px' }}>
          <CircularProgress />
        </Box>
      )}
      {!isFetching && (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} onClick={handleClick} />
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
