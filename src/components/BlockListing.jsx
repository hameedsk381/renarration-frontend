import { Edit } from '@mui/icons-material';
import {
  Box,
 Button, Card, CardContent, 
 CardHeader, CardMedia,  Chip,  Divider,  Paper, Stack, Typography, 
} from '@mui/material';
import React, {  useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import Annotator from './Annotator';
import { removeAnnotatedBlock, updateAnnotatedBlock } from '../redux/actions/annotationActions';

function BlockListing({ blocks }) {
  const renarratedBlocks = blocks;
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  const [clickedElementContent, setClickedElementContent] = useState('');
  const [initialBodycontent, setInitialBodyContent] = useState();
  const [tags, setTags] = useState([]);
  const handleEdit = (id, elementcontent, bodycontent,tags) => {
    console.log(elementcontent,bodycontent);
    setCurrentBlockId(id);
    setOpenDialog(true);
    setClickedElementContent(elementcontent);
    setInitialBodyContent(bodycontent);
    setTags(tags)
  };
  const handleSave = (htmlContent, annotationContent,tags) => {
    const existingBlockIndex = annotatedBlocks.findIndex((block) => block.target.id === currentBlockId);

    const existingBlock = annotatedBlocks[existingBlockIndex];

    // Update the body value of the existing block
    const updatedBlock = {
      ...existingBlock,
      tags:tags,
      body: {
        ...existingBlock.body,
        value: annotationContent, // Update this with the new body value
      },
    };

    // Dispatch the action to update the annotated block
    dispatch(updateAnnotatedBlock(existingBlock.target.id, updatedBlock));
    setOpenDialog(false);
  };
  const deleteBlock = () => {
    // Dispatch action to delete the block
    dispatch(removeAnnotatedBlock(currentBlockId));

    // setSnackbarMessage('Block deleted successfully');
    // setSnackbarOpen(true);
    setOpenDialog(false);
  };

  useEffect(() => {
  console.log(renarratedBlocks)
  }, [])
  
  return (
    <Stack my={5} p={2} component={Paper} elevation={1} >

      {renarratedBlocks && renarratedBlocks.map((block,index) => (
       <Stack key={index}>
         <Stack direction={'row'} justifyContent={'space-between'} >
         <Button onClick={() => handleEdit(block.target.id, block.target.value, block.body.value,block.tags)} startIcon={<Edit />}>Edit</Button>
         <Box>
          {block.tags && block.tags.map((tag, index) => (
        <Chip variant='outlined' key={index} label={tag} style={{ margin: '0.3rem', marginRight: '5px' }}  />
      ))}
          </Box>
         </Stack>
       <Stack direction="row" spacing={1} justifyContent="center">
              {extractMedia(block.target.value).map((src, index) => (
                <img
                  key={index}
                  style={{
                    width: '50%', height: 'auto', objectFit: 'cover', padding: 0.5,
                  }}
                  src={src}
                  alt={`Renarration  ${index + 1}`}
                />
              ))}
            </Stack>
            {/* <div dangerouslySetInnerHTML={{ __html: removeMedia(block.target.value) }} /> */}
            <Typography textTransform={'uppercase'} fontSize={12} color={'#6B96C0'} mt={2}>Your Re-narration</Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2, my: 1,borderColor:'#2196F3'
              }}
            >
             
              <div dangerouslySetInnerHTML={{ __html: block.body.value }} />
           
            </Paper>
          
            <Divider variant='middle' sx={{my:3, display: index === renarratedBlocks.length - 1 ? 'none' : 'block'}}/>
       </Stack>
      ))}
        
      <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
        onDelete={deleteBlock}
        initialValue={initialBodycontent}
        annotatedtags={tags}
      />
    </Stack>
  );
}

export default BlockListing;
