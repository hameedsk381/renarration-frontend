import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Stepper, Step, StepLabel, TextField, Snackbar, Alert, Container, Paper, CardHeader, Stack } from '@mui/material';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import { ArrowBack, ArrowForward, NearMe } from '@mui/icons-material';
import { resetState } from '../redux/actions/urlActions';
import { resetAnnotations } from '../redux/actions/annotationActions';
import { submitApi } from '../apis/extractApis';
import axios from 'axios';
import AnnotatedBlocks from './AnnotatedBlocks';
import RenarrationBlock from './RenarrationBlock';

const RenarrationList = () => {
    const navigate = useNavigate();
   
    const renarratedBlocks = useSelector(state =>
        state.annotation.annotatedBlocks.filter(block => block.rennarationStatus === true)
    );

    const [activeStep, setActiveStep] = useState(0);
    const [renarrationTitle, setRenarrationTitle] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg,setsnackbarMsg] = useState('');
const dispatch = useDispatch();
    const steps = ['Create Renarration', 'Submit Renarration'];

    const handleNext = async() => {
       
        if (activeStep === steps.length - 1) {
            if (!renarrationTitle.trim()) {
                setSnackbarOpen(true);
                setsnackbarMsg('Please give the title to renarration ')
                return;
            }
            const formData = new FormData();

            // Add renarration title to the form data
            formData.append('renarrationTitle', renarrationTitle);
        
            // Add blocks to the form data
            renarratedBlocks.forEach((block, index) => {
                formData.append(`blocks[${index}][content]`, block.content);
                formData.append(`blocks[${index}][id]`, block.id);
                formData.append(`blocks[${index}][desc]`, block.desc);
                formData.append(`blocks[${index}][source]`, block.source);
                formData.append(`blocks[${index}][rennarationStatus]`, true);
                // Append files if they exist
                if (block.img) {
                    formData.append(`blocks[${index}][img]`, block.img);
                }
                if (block.aud) {
                    formData.append(`blocks[${index}][aud]`, block.aud);
                }
                if (block.vid) {
                    formData.append(`blocks[${index}][vid]`, block.vid);
                }
            });
            try {
                 // Send a POST request with the form data
        const response = await axios.post(submitApi, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        handleExit();
        setSnackbarOpen(true);
        setsnackbarMsg("Renarration submitted successfully")
        setTimeout(() => navigate('/'), 3000);
            } catch (error) {
                setSnackbarOpen(true)
                setsnackbarMsg('Error submitting renarration:', error.message);  
                console.log(error)
            }
           
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleExit = () => {
        dispatch(resetState());
        dispatch(resetAnnotations());
     
         localStorage.clear(); // Clear local storage
         sessionStorage.clear(); // Clear session storage (if you use it)
      };
    const getStepContent = (stepIndex) => {
        const navigate = useNavigate();
        const {annotatedBlocks} = useSelector(state=>state.annotation);
        const rennaratedBlocks = useSelector(state =>
            state.annotation.annotatedBlocks.filter(block => block.rennarationStatus === true)
        );

        useEffect(() => {
            console.log(rennaratedBlocks);

        }, [rennaratedBlocks])
        switch (stepIndex) {
            case 0:
                return (
                    <Container maxWidth="lg">
                    <Typography variant="h4" component="h1" gutterBottom sx={{ marginY: 4 }}>
                       Annotated Blocks
                    </Typography>
                  
                    <Stack direction={'row'} justifyContent={'space-between'}>
                    <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={()=>{ navigate('/re-narrate')}}>
                        Back to Annotate
                    </Button>
                   {annotatedBlocks.length !== 0 &&  <Button variant='contained' onClick={()=>{navigate('/view-rennaration')}} endIcon={<ArrowForward/>}>View Re-narration</Button>}
                    </Stack>
                    <Grid container spacing={4} sx={{ marginTop: 2 }}>
                        {annotatedBlocks && annotatedBlocks.map(block => (
                            <Grid item key={block.id} xs={12} md={6} lg={4}>
                               <RenarrationBlock block={block}/>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                );
            case 1:
                return (
                  <>
                    <Box>
                        <TextField
                            label="Renarration Title"
                            value={renarrationTitle}
                            onChange={(e) => setRenarrationTitle(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                        />
                       
                   
                    </Box>
                     <Box>
                     <Typography textAlign={'center'} variant='h4'>{renarrationTitle}</Typography>
                     <Grid container p={3} spacing={2}>
                      {rennaratedBlocks && rennaratedBlocks.map(block => (
                          <Grid item key={block.id} xs={12} sm={6}  >
                              <Card>
                              <CardHeader
      action={
          <Button variant='outlined' size='small' endIcon={<NearMe/>} href={block.source} target='_blank'>source</Button>
      }
subheader={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
/>
                                  <CardMedia>
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 1 }}>
                                          {extractMedia(block.content).map((src, index) => (
                                              <Box
                                                  key={index}
                                                  component="img"
                                                  sx={{
                                                      width: '50%',
                                                      height: 'auto',
                                                      objectFit: 'cover',
                                                      p: 0.5,
                                                  }}
                                                  src={src}
                                                  alt={`Renarration image ${index + 1}`}
                                              />
                                          ))}

                                      </Box>
                                  </CardMedia>
                                  <CardContent>
                                      <div dangerouslySetInnerHTML={{ __html: removeMedia(block.content) }} />
                                      <Paper variant='outlined' sx={{ p: 2, my: 3 }}>
                                          {block.img && (
                                              <Box component="img" src={(block.img)} alt={`Renarration image`} sx={{ width: '50%', height: 'auto', objectFit: 'cover', p: 0.5 }} />
                                          )}
                                          <Typography my={2}>{block.desc}</Typography>
                                          {block.aud && (
                                              <audio controls src={(block.aud)} style={{ marginBlock: "20px" }} />
                                          )}
                                          {block.vid && (
                                              <video controls width="100%" src={(block.vid)} style={{ marginBlock: "20px" }} />
                                          )} </Paper>
                                  </CardContent>

                              </Card>
                          </Grid>
                      ))}
                      </Grid>
              </Box>
                  </>
                );
            
        }
    };

    return (
        <>

            <Container variant='outlined' component={Paper} maxWidth='lg' sx={{ width: '100%', p: 4,my:2,backgroundColor:"#f3f3f3" }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 2 }}>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} disabled={renarratedBlocks.length === 0}>
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                </Box>

                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                       {snackbarMsg}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

export default RenarrationList;
