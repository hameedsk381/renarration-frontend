import { Close, CopyAll, Facebook, Share, Twitter, WhatsApp } from '@mui/icons-material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux/actions/snackbarActions';
import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import { closeModal } from '../redux/actions/modalActions';

const ShareRenarration = ({id}) => {
const dispatch = useDispatch();
const currentUrl = `${window.location.href}${id}`;
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
        handleClose()
      };
    
      const shareToFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        shareUrl(facebookUrl);
        handleClose()
      };
    
      const shareToTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
        shareUrl(twitterUrl);
        handleClose()
      };
      const shareUrl = async (url) => {
        try {
          await navigator.share({ url });
        } catch (error) {
          // console.error('Error sharing:', error);
          // Fallback for browsers that don't support the Web Share API
          window.open(url, '_blank');
          handleClose();
        }
      };
      const handleClose = ()=>{
        dispatch(closeModal())
      }
  return (
    <Box >
        <Stack justifyContent={'space-between'} my={2}>
            <Typography variant='h4'> <Share/> Share</Typography>

        </Stack>
        <Divider/>
        <Typography my={1} fontStyle={'italic'}> Share to social media</Typography>
          <IconButton color='success' onClick={() => handleShareOption('whatsapp')}><WhatsApp /></IconButton>
          <IconButton color='primary' onClick={() => handleShareOption('facebook')}><Facebook/></IconButton>
          <IconButton color='primary' onClick={() => handleShareOption('twitter')}><Twitter/></IconButton>
          <Divider sx={{my:2}}/>
          <Button startIcon={<CopyAll/>} onClick={() => { navigator.clipboard.writeText(window.location.href);dispatch(showSnackbar("Copied succesffuly", 'success')); }}>Copy url</Button>
       <Typography my={2}>{window.location.href}{id}</Typography>
        </Box>
  )
}

export default ShareRenarration