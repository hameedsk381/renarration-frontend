import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
 Box, Button, Card, CardContent, CardHeader,
  CardMedia,  Container,  Drawer,  Grid, Paper, Stack, Typography,
} from '@mui/material';
import {
  ArrowBack,  CopyAll,  NearMe, Share,
} from '@mui/icons-material';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import { getAllRenarrations} from '../apis/extractApis';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';
import EditRenarration from './EditRenarration';
import { showSnackbar } from '../redux/actions/snackbarActions';
import { useDispatch } from 'react-redux';

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
  const handleShareOption = (option) => {
    switch (option) {
      case 'whatsapp':
        shareToWhatsApp();
        break;
      case 'facebook':
        shareToFacebook();
        break;
      case 'twitter':
        shareToTwitter();
        break;
      default:
        break;
    }
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(currentUrl)}`;
    shareUrl(whatsappUrl);
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    shareUrl(facebookUrl);
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
    shareUrl(twitterUrl);
  };
  const shareUrl = async (url) => {
    try {
      await navigator.share({ url });
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback for browsers that don't support the Web Share API
      window.open(url, '_blank');
    }
  };
  useEffect(() => {
    getRennaration();
    // console.log(renarrationId)
  }, [renarrationId]);
  const skeletons = Array.from({ length: 6 }, (_, index) => index);
  return renarration
    ? (
      <Container>
        <Stack m={4} direction="row" justifyContent="space-between">
          <Button startIcon={<ArrowBack />} onClick={() => { navigate('/'); }} variant="contained">Go Back</Button>
          <EditRenarration renarrationId={renarration._id} />
        </Stack>
        <Typography textAlign="center" variant="h4" my={3}>{renarration.renarrationTitle}</Typography>
        {renarration.blocks.map((block) => (
            <Card key={block.target.id} variant="elevation" elevation={3} sx={{p:2}} >
              <CardHeader
                action={
                 <Stack direction={'row'} spacing={2}>
                   <Button variant="outlined" size="small" endIcon={<NearMe />} onClick={()=>{navigate(`/sweet/${block._id}`)}} >view in original site</Button>
                   <Button variant="outlined" size="small" endIcon={<Share />} onClick={() =>{setOpenDrawer(true) }}>share</Button>
                 </Stack>
            }
                subheader={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
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
      </Container>
    )
    : (
      <Container>
        <Button startIcon={<ArrowBack />} sx={{ m: 4 }} onClick={() => { navigate('/'); }} variant="contained">Go Back</Button>
        <Grid container spacing={2} p={3}>

          {skeletons.map((_, index) => (
            <Grid key={index} item lg={3} md={4} xs={12}>
              <RenarrationBlockSkeleton key={index} />
            </Grid>
          ))}

        </Grid>

      </Container>
    );
}

export default Renarration;
