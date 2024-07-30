import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



import { createRenarrationPage, sweetsbyurl } from '../apis/extractApis';
import {
  AppBar,
  Card,
  CardContent,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  Alert,
  Skeleton,
  Grid,
  Badge,
} from '@mui/material';
import RenarrationBlock from './RenarrationBlock';

import { showSnackbar } from '../redux/actions/snackbarActions';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';


const ComposePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = useSelector((state) => state.url.currentUrl);
  const [sweets, setsweets] = useState([]);
  const [filteredsweets, setFilteredsweets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageBlocks, setPageBlocks] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Add sweets', 'Review Page'];
  const [loading, setLoading] = useState(false);
  const [sweetcount, setSweetCount] = useState(0);
  const [renarrationTitle, setRenarrationTitle] = useState('');

  const handleApiCall = async () => {
    try {
      setLoading(true)
      const response = await axios.post(sweetsbyurl, { url: currentUrl });
      setsweets(response.data);
      setFilteredsweets(response.data);
      // console.log(response.data);
      dispatch(showSnackbar(' fetched sweets successfully','success'))
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(showSnackbar('error fetching sweets','error'))
      // Handle any errors from the fetch
    }
  };
  const extractText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
  const handleSubmitRenarration = async () => {
    try {
      const submitdata = {
        sweetcount,
        sweets: pageBlocks.map(block => block._id),
        renarrationUrl: currentUrl,
        renarrationTitle,
        sharingId: uuidv4()
      }
    
      // Example POST request to a backend endpoint
      const response = await axios.post(createRenarrationPage, submitdata);
      // console.log('Submission successful:', response.data);
      dispatch(showSnackbar(response.data.message, 'success'));
      navigate('/')
      // Optionally reset state or redirect user
    } catch (error) {
      // console.error('Failed to submit renarration:', error);
    }
  };
  
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value) {
      const filteredData = sweets.filter(annotation =>
        annotation.renarrationTitle.toLowerCase().includes(value.toLowerCase()) 
      );
      setFilteredsweets(filteredData);
    } else {
      setFilteredsweets(sweets);
    }
  };

  const handleAddToPage = (block) => {
    setPageBlocks(current => [...current, block]);
    setSweetCount(prevcount => prevcount + 1);
    // console.log(sweetcount);
    // console.log(block)
  };
  const isBlockInFilteredSweets = (blockId) => {
    return pageBlocks.some((annotation) => annotation._id === blockId);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  
  useEffect(() => {
    handleApiCall();
  }, [currentUrl]);
  useEffect(() => {
  //  console.log(pageBlocks)
  }, [pageBlocks]);

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
          <TextField
                variant="outlined"
                placeholder="Search sweets..."
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ mb: 2, mx: 4 }}
              />
              <Typography color={'#1565c0'} ml={4} my={2}>Showing results for <span style={{color:'black'}}>"{currentUrl}"</span></Typography>
            {filteredsweets.length === 0 ? <Alert severity='info'>No  sweets found for "{searchQuery}"</Alert> : <Box>
              
              <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', px: 4, py: 2 }}>
                {filteredsweets.map((block) => (
                  <Box key={block._id} sx={{ display: 'inline-block', width: 300, marginRight: 2, verticalAlign: 'top' }}>
                    <Card>
                      <CardContent>
                        <Typography variant='h4' textTransform={'capitalize'}>
                          {block.renarrationTitle}
                        </Typography>
                        <Typography my={3}>
                         No of annotations :  {block.annotations.length}
                        </Typography>
                        <Button variant="contained" onClick={() => handleAddToPage(block)}   disabled={isBlockInFilteredSweets(block._id)}>
                          Add to Page
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>}
          </>
        );
  
      case 1:
        return (
          <Container maxWidth="lg" sx={{ my: 3 }}>
            <TextField
              variant="outlined"
              placeholder="Enter Renarration Title..."
              fullWidth
              value={renarrationTitle}
              onChange={(e) => setRenarrationTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2} sx={{my:3}} >
              {pageBlocks.sort((a, b) => a.renarrationTitle.localeCompare(b.renarrationTitle)).map((block, index) => (
                <Grid item key={index}  >
                  <Badge color="info" sx={{p:2}} badgeContent={block.renarrationTitle}>
                    <Box sx={{ my: 4, p: 3 }}>
                      {block.annotations.map((annotation) => (
                        <RenarrationBlock key={annotation._id} block={annotation} page noTags />
                      ))}
                    </Box>
                  </Badge>
                </Grid>
              ))}
              <Grid item xs={12} sx={{ mt: 4 }}>
                <Stack spacing={3} />
              </Grid>
            </Grid>
          </Container>
        );
  
      default:
        return 'Unknown step';
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* Adjust the number and sizes of skeletons based on your table layout */}
        <Button sx={{my:3}} variant='contained' onClick={() => { navigate(-1); }} color="inherit" startIcon={<ArrowBack />} aria-label="settings">
            Go back
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" animation="wave" height={190} width="100%" />
            </Grid>

        </Grid>
      </Container>
    );
  }


  return (
    <>
      <Container sx={{ py: 10 }}>
        <AppBar>
          <Toolbar>
            <Container sx={{ my: 2, justifyContent: 'space-between', flexDirection: 'row', display: 'flex' }} maxWidth='lg'>
              <Stack>
                <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 24, md: 32 } }} color={'white'}>
                  Re-narration
                </Typography>
              </Stack>
            </Container>
          </Toolbar>
        </AppBar>
     
        {sweets.length === 0 ? <Alert>No sweets found for this url create now </Alert> : <>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
  
          <Container>
            {getStepContent(activeStep)}
          </Container>
        </>}
  
        
      </Container>
      <Stack position={'fixed'} bottom={0} width={'100%'} bgcolor={'white'} py={2} component={Paper} elevation={5}>
          <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ?
              <Button
                variant="contained"
                onClick={handleSubmitRenarration}  // This should be defined to handle submit logic
                disabled={pageBlocks.length === 0 || !renarrationTitle}
              >
                Create Renarration
              </Button>
              :
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1 || pageBlocks.length === 0}
              >
                Next
              </Button>
            }
          </Container>
        </Stack>
        
    </>
  );
  
};

export default ComposePage;