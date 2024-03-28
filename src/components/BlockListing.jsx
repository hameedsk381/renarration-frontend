import { Edit } from '@mui/icons-material';
import {
 Button, Card, CardContent, 
 CardHeader, CardMedia,  Paper, Stack, 
} from '@mui/material';
import React, {  useState } from 'react';
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
  const handleEdit = (id, elementcontent, bodycontent) => {
    setCurrentBlockId(id);
    setOpenDialog(true);
    setClickedElementContent(elementcontent);
    setInitialBodyContent(bodycontent);
  };
  const handleSave = (htmlContent, annotationContent) => {
    const existingBlockIndex = annotatedBlocks.findIndex((block) => block.target.id === currentBlockId);

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
    setOpenDialog(false);
  };
  const deleteBlock = () => {
    // Dispatch action to delete the block
    dispatch(removeAnnotatedBlock(currentBlockId));

    // setSnackbarMessage('Block deleted successfully');
    // setSnackbarOpen(true);
    setOpenDialog(false);
  };
  return (
    <Stack my={3} p={2} spacing={3}>

      {renarratedBlocks && renarratedBlocks.map((block) => (
        <Card key={block.target.id} variant="elevation" elevation={0}>
          <CardHeader
            subheader={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            action={
              <Button onClick={() => handleEdit(block.target.id, block.target.value, block.body.value)} startIcon={<Edit />}>Edit</Button>

            }
          />
          <CardMedia>
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
          </CardMedia>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: removeMedia(block.target.value) }} />
            <Paper
              variant="outlined"
              sx={{
                p: 2, my: 3,
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: block.body.value }} />
            </Paper>
          </CardContent>

        </Card>
      ))}
      <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
        onDelete={deleteBlock}
        initialValue={initialBodycontent}
      />
    </Stack>
  );
}

export default BlockListing;
