import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
 Box, Button, Container,  Divider,  Drawer,  Grid, Paper, Stack, Toolbar, Typography,
} from '@mui/material';
import {
  ArrowBack,  CopyAll,  Edit,  NearMe, Share,
} from '@mui/icons-material';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import { getAllRenarrations} from '../apis/extractApis';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';

import { showSnackbar } from '../redux/actions/snackbarActions';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/actions/modalActions';
import EditRenarration from './EditRenarration';

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
  <Container sx={{ mt: 14,mb:2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
    <Typography color={'#0069D2'} fontSize={12} >Title</Typography>
  <Typography textAlign="left" fontStyle={'italic'} fontWeight={'semibold'} fontSize={32} >{renarration.renarrationTitle}</Typography>
  </Container>
        <Divider />
       
          <Container sx={{p:2,mb:5,mt:3,bgcolor:{xs:'transparent',md:'background.paper'}}} component={Paper} elevation={0} >

{renarration && renarration.blocks.map((block,index) => (
 <Stack key={block._id}>
   <Stack direction={'row'} justifyContent={'space-between'} my={2}>
    <Typography sx={{fontSize:{xs:12,md:16}}}>{new Date(block.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</Typography>
    <Stack direction={'row'} spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                   <Button variant="outlined" color='success' size="small" endIcon={<NearMe />} sx={{fontSize:{xs:8,md:12}}} onClick={()=>{navigate(`/sweet/${block._id}`)}} >read original site</Button>
                   <Button variant="outlined" size="small" endIcon={<Share />} sx={{fontSize:{xs:8,md:12}}} onClick={() =>{setOpenDrawer(true) }}>share</Button>
                 </Stack>
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
      <div dangerouslySetInnerHTML={{ __html: removeMedia(block.target.value) }} />
      <Typography textTransform={'uppercase'} fontSize={12} color={'#6B96C0'} mt={2}>The Re-narration</Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 2, my: 1
        }}
      >
       
        <div dangerouslySetInnerHTML={{ __html: block.body.value }} />
      </Paper>
      <Divider variant='middle' sx={{my:3, display: index === renarration.blocks.length - 1 ? 'none' : 'block'}}/>
 </Stack>
))}
</Container>
<Stack direction={'row'} justifyContent={'flex-end'} position={'fixed'} bottom={0} width={'100%'} bgcolor={'white'} py={2} component={Paper} elevation={2}>
   
     
      <Button sx={{mr:12}} variant="contained" color='success' startIcon={<Edit />} onClick={handleEdit} >Edit Renarration </Button>

   </Stack>
          <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div style={{ width: 250 }}>
          <Button onClick={() => handleShareOption('whatsapp')}>WhatsApp</Button>
          <Button onClick={() => handleShareOption('facebook')}>Facebook</Button>
          <Button onClick={() => handleShareOption('twitter')}>Twitter</Button>
          <Button startIcon={<CopyAll/>} onClick={() => { navigator.clipboard.writeText(window.location.href);dispatch(showSnackbar("Copied succesffuly", 'success')); }}>Copy</Button>
          {/* Add buttons for other platforms if needed */}
        </div>
      </Drawer>
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
