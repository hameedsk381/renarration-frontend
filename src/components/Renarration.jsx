import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, CircularProgress, Toolbar, Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import Annotator from './Annotator';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addRenarrationBlock, deleteRenarrationBlock , updateRenarrationBlock } from '../redux/actions'; // Import the necessary action creators

const Renarration = ({ addRenarrationBlock, isFetching ,htmlContent,renarrationBlocks ,updateRenarrationBlock}) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [clickedElementContent, setClickedElementContent] = useState({ html: '', css: '', js: '' });
  const [description, setDescription] = useState(''); // State to hold the description of the clicked element
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  const navigate = useNavigate();

useEffect(() => {
console.log(htmlContent)
}, [])


const handleClick = (event) => {
  let elementId = event.target.dataset.id;
  let existingBlock;
  if (elementId) {
    // If the element has an ID, check if a block with this ID already exists
    existingBlock = renarrationBlocks.find(block => block.id === elementId);
  } else {
    // If the element does not have an ID, generate a new one
    elementId = uuidv4();
    event.target.dataset.id = elementId; // Assign the ID to the element's data-id attribute
  }
 
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
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} onClick={handleClick} />
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
