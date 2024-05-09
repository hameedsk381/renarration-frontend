import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



import { sweetsbyurl } from '../apis/extractApis';
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
} from '@mui/material';
import RenarrationBlock from './RenarrationBlock';

import { showSnackbar } from '../redux/actions/snackbarActions';
import { useNavigate } from 'react-router-dom';


const ComposePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = useSelector((state) => state.url.currentUrl);
  const [annotations, setAnnotations] = useState([]);
  const [filteredAnnotations, setFilteredAnnotations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageBlocks, setPageBlocks] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Add Annotations', 'Review Page'];
 

  const handleApiCall = async () => {
    try {
      const response = await axios.post(sweetsbyurl, { source: currentUrl });
      setAnnotations(response.data);
      setFilteredAnnotations(response.data);
    } catch (error) {
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
       annotations : pageBlocks.map(block => block._id),
       renarrationUrl:currentUrl,
       sharingId: uuidv4()
      }
    
      // Example POST request to a backend endpoint
      const response = await axios.post('http://localhost:2424/renarrations/create',  submitdata);
      console.log('Submission successful:', response.data);
      dispatch(showSnackbar(response.data.message, 'success'));
      navigate('/')
      // Optionally reset state or redirect user
    } catch (error) {
      console.error('Failed to submit renarration:', error);
    }
  };
  
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value) {
      const filteredData = annotations.filter(annotation =>
        annotation.body.title.toLowerCase().includes(value.toLowerCase()) ||
        extractText(annotation.body.value).toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAnnotations(filteredData);
    } else {
      setFilteredAnnotations(annotations);
    }
  };

  const handleAddToPage = (block) => {
    setPageBlocks([...pageBlocks, block]);
    setFilteredAnnotations(prev => prev.filter(annotation => annotation._id !== block._id));
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

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            {filteredAnnotations.length === 0 ? <Alert severity='info'>No more annotations found for this url</Alert> : <Box>
              <TextField
                variant="outlined"
                placeholder="Search Annotations..."
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ mb: 2, mx: 4 }}
              />
              <Typography color={'#1565c0'} ml={4} my={2}>Showing results for <span style={{color:'black'}}>"{currentUrl}"</span></Typography>
              <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', px: 4, py: 2 }}>
                {filteredAnnotations.map((block) => (
                  <Box key={block._id} sx={{ display: 'inline-block', width: 300, marginRight: 2, verticalAlign: 'top' }}>
                    <Card>
                      <CardContent>
                        <Typography variant='h4' textTransform={'capitalize'}>
                          {block.body.title}
                        </Typography>
                        <Typography my={3}>
                          {extractText(block.body.value).substring(0,50)}
                        </Typography>
                        <Button variant="contained" onClick={() => handleAddToPage(block)}>
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
          <Container>
            <Container>
              {pageBlocks.sort((a, b) => a.body.title.localeCompare(b.body.title)).map((block, index) => (
                <RenarrationBlock key={block._id} block={block} />
              ))}
              <Stack spacing={3} sx={{ mt: 4 }} />
            </Container>
          </Container>
        );
  
      default:
        return 'Unknown step';
    }
  };
  



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
        <Stack my={3}>
       
        </Stack>
        {annotations.length === 0 ? <Alert>No annotations found for this url create now </Alert> : <>
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
                disabled={pageBlocks.length === 0}
              >
                Submit
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

