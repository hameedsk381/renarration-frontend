import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import RenarrationBlock from './RenarrationBlock';
import { Container, Box, Typography, TextField, Button, IconButton, Paper, Stack, Snackbar, Alert } from '@mui/material';
import { ArrowBack, Audiotrack, Cancel, Image, RecordVoiceOverOutlined, RecordVoiceOverRounded, VideoLibraryOutlined } from '@mui/icons-material';
import ImageInput from './ImageInput';
import AudioInput from './AudioInput';
import VideoInput from './VideoInput';
import Recording from './Recording';
import DescriptionInput from './DescriptionInput';
import { useDispatch } from 'react-redux';
import { resetForm, setDescription, setID, submitForm, updateRenarrationBlock } from '../redux/actions';
import { useSelector } from 'react-redux';
const EditRennarationBlock = () => {
  const location = useLocation();
  const blockId = location.state;
  const renarrationBlocks = useSelector(state => state.renarrationBlocks.renarrationBlocks);
  const selectedBlock = renarrationBlocks.find(block => block.id === blockId);
  const content = selectedBlock ? selectedBlock : null;
const navigate = useNavigate();
const dispatch = useDispatch();
const modifiedBlock = useSelector(state=>state.formdata)
const {description} = useSelector(state => state.formdata);
const [snackbarOpen, setSnackbarOpen] = React.useState(false);
useEffect(() => {
  console.log(selectedBlock)
 
}, [])

const handleSubmit = (e) => {
  e.preventDefault();
  if (description === '') {
    // Show snackbar if description is empty
    setSnackbarOpen(true);
    return;
  }
  dispatch(submitForm());

  dispatch(updateRenarrationBlock({ id:blockId,content:selectedBlock.content,...modifiedBlock }));
  dispatch(resetForm());
  console.log(renarrationBlocks);
};

const handleSnackbarClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setSnackbarOpen(false);
};
  return (
    <Container  maxWidth='md' sx={{my:2,p:2}}>
      <Button variant="contained" color="primary" startIcon={<ArrowBack />} size='small' sx={{mb:2}} onClick={()=>{ navigate('/create-rennaration')}}>
              Go Back
            </Button>
    <RenarrationBlock block={content} noActions={true}/>
    <Stack my={4} gap={2}>
    <DescriptionInput desc={selectedBlock.description}/>
    <Recording/> 
<ImageInput />
<AudioInput/>
<VideoInput/>

                <Button  variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Stack>
            <Snackbar  open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          Please fill in the description.
        </Alert>
      </Snackbar>
    </Container>

  )
}

export default EditRennarationBlock;