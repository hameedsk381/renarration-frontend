import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import RenarrationBlock from './RenarrationBlock';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';
import { getAllRenarrations, sweetsbyurl, updateRenarration, verifyRenarration } from '../apis/extractApis';
import '../css/RenarrationByUrl.css';
import { AppBar, Button, Container, Stack, Toolbar, Typography, Modal, Box, TextField, Card, Alert, CircularProgress, Divider } from '@mui/material';
import { Add, Edit, Delete, Update } from '@mui/icons-material';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux/actions/snackbarActions';

const RenarrationByUrl = () => {
  const { id: renarrationId } = useParams();
  const navigate = useNavigate();
  const [initialRenarration, setInitialRenarration] = useState([]);
  const [renarration, setRenarration] = useState([]);
  const [additionalBlocks, setAdditionalBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [shareId, setShareId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
 const [title,setTitle] = useState('')

  const fetchRenarration = async () => {
    try {
      const response = await axios.get(`${getAllRenarrations}/${renarrationId}`);
      setRenarration(response.data.sweets);
      setInitialRenarration(response.data.sweets);
   setTitle(response.data.renarrationTitle)
    } catch (error) {
      console.error('Failed to fetch renarration:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRenarration();
  }, [renarrationId]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleVerifyShareId = async () => {
    if (!shareId) {
      setErrorMessage('Please enter sharing ID');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post(`${verifyRenarration}`, { sharingId: shareId, id: renarrationId });
      const sweetsResponse = await axios.post(`${sweetsbyurl}`, { url: response.data.renarrationData.renarrationUrl });
      const filteredSweets = sweetsResponse.data.filter(
        (sweet) => !renarration.some((renarrationItem) => renarrationItem._id === sweet._id)
      );
      setAdditionalBlocks(filteredSweets);
      setEditMode(true);
      setOpenModal(false);
      setShareId('');
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.response?.status === 400 ? 'Invalid Share ID' : 'Failed to verify Share ID');
      setLoading(false);
    }
  };

  const handleDeleteBlock = (blockId) => {
    const deletedBlock = renarration.find((block) => block._id === blockId);
    setRenarration((prevBlocks) => prevBlocks.filter((block) => block._id !== blockId));
    setAdditionalBlocks((prevBlocks) => [...prevBlocks, deletedBlock]);
  };

  const handleAddBlock = (block) => {
    setRenarration((prevBlocks) => [...prevBlocks, block]);
    setAdditionalBlocks((prevBlocks) => prevBlocks.filter((b) => b._id !== block._id));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${updateRenarration}/${renarrationId}`, { sweets: renarration });
      if (response.status === 200) {
        setEditMode(false);
        navigate('/');
        dispatch(showSnackbar('Renarration updated successfully','success'))
      }
      // console.log(renarration)
      // console.log(isRenarrationChanged)
    } catch (error) {
      console.error('Failed to update renarration:', error);
    }
  };

  const isRenarrationChanged = !_.isEqual(initialRenarration, renarration);

  const skeletons = Array.from({ length: 6 }, (_, index) => index);

  return (
    <>
      <AppBar position="sticky" sx={{py: 1 }}>
        <Toolbar>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column-reverse', md: 'row' } }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 26, md: 32 }, color: 'white', order: { xs: 2, md: 1 } }}>
              Re-narration
            </Typography>
            {!editMode && <Stack direction={'row'} my={2} spacing={2} sx={{ order: { xs: 1, md: 2 } }}>
              <Button  size='small' startIcon={<Add />} onClick={() => navigate('/')}  sx={{ fontSize: { xs: 10, md: 14 ,color:'white'} }}>
                Start a new re-narration
              </Button>
              <Button  size='small' startIcon={<Edit />} onClick={handleOpenModal}  sx={{ fontSize: { xs: 10, md: 14 ,color:'white'} }}>
                Edit renarration
              </Button>
            </Stack>}
            {isRenarrationChanged && (
            <Stack justifyContent={'end'} direction={{ xs: 'column', md: 'row' }} sx={{ order: { xs: 3, md: 3 } }}>
              <Button  startIcon={<Update/>} size='small' color='inherit'  onClick={handleSubmit} sx={{ fontSize: { xs: 10, md: 14,color:'white' } }}>
              Update Renarration
              </Button>
            </Stack>
          )}
          </Container>
        </Toolbar>
      </AppBar>

      {editMode && (
        <Container>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6">
            Add more sweets
          </Typography>
          {additionalBlocks.length > 0 ? (
            <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2 }}>
              {additionalBlocks.map((block) => (
                <Box sx={{ minWidth: '300px', flex: '0 0 auto', mr: 2 }} key={block._id}>
                  <Card sx={{ p: 3 }}>
                    <Typography variant='h5' mb={4}>
                      {block.renarrationTitle}
                    </Typography>
                    <Button variant='outlined' size='small' startIcon={<Add />} onClick={() => handleAddBlock(block)} color='primary' sx={{ fontSize: { xs: 8, md: 14 } }}>
                      Add Block
                    </Button>
                  </Card>
                </Box>
              ))}
            </Box>
          ) : (
            <Container sx={{ my: 3 }}>
              <Alert severity='info'>No more sweets to add for this URL</Alert>
            </Container>
          )}
          
        </Container>
      )}
 <Typography variant='h4' ml={10} fontStyle={'italic'} p={3} >{title.charAt(0).toUpperCase() + title.slice(1)}</Typography>
          <Divider sx={{mb:4}}/>
      <div className="content-container">
        {loading ? (
          <div className="skeleton-container">
            {skeletons.map((_, index) => (
              <RenarrationBlockSkeleton key={index} />
            ))}
          </div>
        ) : renarration.length > 0 ? (
          <>
         
            {renarration.map((block, index) => (
              
              <div className="block-container" key={index}>
                <Typography className="badge" sx={{bgcolor:'red'}} >{block.renarrationTitle.charAt(0).toUpperCase() + block.renarrationTitle.slice(1)}</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }} justifyContent={'end'}>
                  {editMode && (
                    <Button variant='outlined' size='small' startIcon={<Delete />} onClick={() => handleDeleteBlock(block._id)} color='secondary' sx={{ fontSize: { xs: 8, md: 14 } }}>
                      Delete Block
                    </Button>
                  )}
                </Stack>
                <div className="block-content">
                  {block.annotations.map((annotation) => (
                    <RenarrationBlock key={annotation._id} block={annotation} noTags />
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="no-data-container">
            <div className="loader"></div>
            <p>No renarrations found</p>
            <button className="go-back-button" onClick={() => navigate('/')}>
              Go Back
            </button>
          </div>
        )}
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Enter Sharing ID
          </Typography>
          <TextField
            required
            label="Sharing ID"
            variant="outlined"
            fullWidth
            value={shareId}
            onChange={(e) => setShareId(e.target.value)}
            sx={{ mt: 2 }}
          />
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleVerifyShareId} sx={{ mt: 2 }}>
          {loading ? <CircularProgress color='inherit'/> : 'Verify'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default RenarrationByUrl;
