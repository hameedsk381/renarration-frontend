import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
 Box, Button, Container,  Divider,  Drawer,  Grid, IconButton, Paper, Stack, Toolbar, Typography,
} from '@mui/material';
import {
  ArrowBack,  CopyAll,  Edit,  Facebook,  NearMe, Share, Speaker, Twitter, WhatsApp,
} from '@mui/icons-material';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import { getAllRenarrations} from '../apis/extractApis';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';

import { showSnackbar } from '../redux/actions/snackbarActions';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/actions/modalActions';
import EditRenarration from './EditRenarration';
import DoctoString from '../utils/DoctoSTring';
import ShareRenarration from './Share';
import RenarrationBlock from './RenarrationBlock';

function Renarration() {
  const renarrationId = useParams().id;
  const [renarration, setRenarration] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const currentUrl = window.location.href;
const dispatch = useDispatch();
  const navigate = useNavigate();

  const getRennaration = async () => {
    try {
      const res = await axios.get(`${getAllRenarrations}/${renarrationId}`);

      setRenarration({ ...res.data, blocks: res.data.blocks });
      // console.log(res.data);
    } catch (error) {
      // console.log(error);
    }
  };
  const speak = (textvalue) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textvalue);
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices[0];
      if (!window.speechSynthesis.speaking) {
        window.speechSynthesis.speak(utterance);
      }
    }
  };
  const handleEdit = ()=>{
    dispatch(openModal( <EditRenarration
      renarrationId={renarrationId}
    />))
  }
  useEffect(() => {
    getRennaration();
    // console.log(renarrationId)
  }, [renarrationId]);
  const skeletons = Array.from({ length: 6 }, (_, index) => index);
  return renarration
    ? (
      <>
      <AppBar >
        <Toolbar>
        <Container sx={{my:2,justifyContent:'space-between' ,flexDirection:'row',display:'flex'}}  maxWidth='lg'>
          <Stack>
          <Typography sx={{fontWeight:'bold',fontSize:{xs:24, md:32}}} color={'white'}>
            SWeEts
         </Typography>
          <Typography sx={{fontWeight:'semibold',fontSize:{xs:8, md:12}}}>Semantic Web Entities</Typography>
          </Stack>
          <Button  onClick={() => { navigate('/'); }} color='inherit' sx={{fontSize:{xs:12, md:14}}}>start a new re-narration</Button>
          
        </Container>
        </Toolbar>
        
      </AppBar>
  <Container sx={{ mt: 14,mb:2, fontSize: { xs: '1.5rem', md: '2rem' } }} >
    <Typography color={'#0069D2'} fontSize={12} >Title</Typography>
  <Typography textAlign="left" textTransform={'capitalize'} fontWeight={'bold'} fontSize={36} >{renarration.renarrationTitle}</Typography>
  </Container>
        <Divider />
       
          <Container sx={{px:4,mb:5,mt:3}} maxWidth='md' >

{renarration && renarration.blocks.map((block,index) => (
<RenarrationBlock block={block} key={block._id} view />
))}
</Container>
<Stack direction={'row'} justifyContent={'flex-end'} position={'fixed'} bottom={0} width={'100%'} bgcolor={'white'} py={2} component={Paper} elevation={2}>
   
     
      <Button sx={{mr:12}} variant="contained" color='success' startIcon={<Edit />} onClick={handleEdit} >Edit Renarration </Button>

   </Stack>
         
      </>
    )
    : (
      <Container>
        <Button startIcon={<ArrowBack />} sx={{ m: 4 }} onClick={() => { navigate('/'); }} variant="contained">Go Back</Button>
        <Grid container spacing={2} p={3}>

          {skeletons.map((_, index) => (
            <Grid key={index} item   xs={12}>
              <RenarrationBlockSkeleton key={index} />
            </Grid>
          ))}

        </Grid>

      </Container>
    );
}

export default Renarration;
