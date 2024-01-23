import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, CircularProgress, Toolbar, Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import Annotator from './Annotator';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addRenarrationBlock, deleteRenarrationBlock , updateRenarrationBlock ,updateHtmlContent} from '../redux/actions'; // Import the necessary action creators

const Renarration = ({ addRenarrationBlock, isFetching ,htmlContent,renarrationBlocks ,updateRenarrationBlock}) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [clickedElementContent, setClickedElementContent] = useState({ html: ''});
  const [description, setDescription] = useState(''); // State to hold the description of the clicked element
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  const navigate = useNavigate();
  const [renderedContent, setRenderedContent] = useState(() => {
    // Get the initial content from localStorage or fallback to htmlContent from Redux
    const savedContent = localStorage.getItem('renderedContent');
    return savedContent ? savedContent : htmlContent;
  });

  // Update localStorage whenever renderedContent changes
  useEffect(() => {
    localStorage.setItem('renderedContent', renderedContent);
  }, [renderedContent]);
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
  
  // If a block with this ID already exists, use its description
  const initialDescription = existingBlock ? existingBlock.description : '';

  const fullHtml = event.target.outerHTML;
  const fullCss = window.getComputedStyle(event.target).cssText;
  const fullJs = event.target.getAttribute('onclick');
  setClickedElementContent({ html: fullHtml, css: fullCss, js: fullJs });
  setOpenDialog(true);
  setDescription(initialDescription); // Set the initial description for the Annotator
  setCurrentBlockId(elementId); // Set the current block ID
};


const handleSave = (updatedContent, description) => {
  const existingBlockIndex = renarrationBlocks.findIndex(block => block.id === currentBlockId);

  if (existingBlockIndex !== -1) {
    // Update existing block
    const updatedBlock = {
      ...renarrationBlocks[existingBlockIndex],
      content: updatedContent, // Update content if necessary
      description: description
    };
    updateRenarrationBlock(updatedBlock); // Dispatch the action to update the existing block
  } else {
    // Add new block
    const newBlock = {
      content: updatedContent,
      description: description,
      id: currentBlockId || uuidv4() // Use the current block ID if available, otherwise generate a UUID
    };
    addRenarrationBlock(newBlock); // Dispatch the action to add a new block

    // Update the htmlContent to include the outline for the annotated element
    const updatedHtmlContent = outlineElement(htmlContent, currentBlockId);
    setRenderedContent(updatedHtmlContent); 
}
  setOpenDialog(false);
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
        <div dangerouslySetInnerHTML={{ __html: renderedContent }} onClick={handleClick} />
      )}
   <Annotator
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  content={clickedElementContent}
  initialDescription={description} // Pass the description to the Annotator
  onSave={handleSave}
/>

    </>
  );
};

const mapStateToProps = (state) => ({
  renarrationBlocks: state.renarrationBlocks.renarrationBlocks,
  htmlContent: state.url.htmlContent,
  isFetching: state.url.isFetching,
  errorMessage: state.url.errorMessage,
});


const mapDispatchToProps = {
  addRenarrationBlock,
  updateRenarrationBlock, // Make sure this action is imported and available
  deleteRenarrationBlock,
};
export default connect(mapStateToProps, mapDispatchToProps)(Renarration);
