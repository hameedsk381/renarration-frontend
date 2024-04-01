import { CopyAll } from '@mui/icons-material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux/actions/snackbarActions';
import { Button } from '@mui/material';

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
  return (
    <div style={{ width: 250 }}>
          <Button onClick={() => handleShareOption('whatsapp')}>WhatsApp</Button>
          <Button onClick={() => handleShareOption('facebook')}>Facebook</Button>
          <Button onClick={() => handleShareOption('twitter')}>Twitter</Button>
          <Button startIcon={<CopyAll/>} onClick={() => { navigator.clipboard.writeText(window.location.href);dispatch(showSnackbar("Copied succesffuly", 'success')); }}>Copy</Button>
          {/* Add buttons for other platforms if needed */}
        </div>
  )
}

export default ShareRenarration