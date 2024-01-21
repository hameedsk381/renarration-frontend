import { ArrowBackRounded, PreviewSharp, PreviewOutlined } from '@mui/icons-material';
import { AppBar, Button, Stack, Toolbar, CircularProgress, Box, Switch, FormGroup, FormControlLabel, Dialog, DialogTitle, DialogContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Renarration = () => {
  const location = useLocation();
  const htmlContent = location.state?.htmlContent;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [renarrationMode, setRenarrationMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
  const [clickedElementContent, setClickedElementContent] = useState(''); // State to store the content of the clicked element

  useEffect(() => {
    // Simulate loading process (e.g., if fetching content asynchronously)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (event) => {
    const fullHtml = event.target.outerHTML; // Get the whole HTML content of the clicked element
    const fullCss = window.getComputedStyle(event.target).cssText; // Get the whole CSS content of the clicked element
    const fullJs = event.target.getAttribute('onclick'); // Get the whole JavaScript content of the clicked element
    setClickedElementContent({ html: fullHtml, css: fullCss, js: fullJs }); // Set the content of the clicked element
    setOpenDialog(true); // Open the dialog to show the content of the clicked element
  };

  const handleClose = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <>
      <AppBar sx={{ background: "#DFDFDF" }}>
        <Toolbar>
          <Stack direction={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Button sx={{ color: 'gray', fontSize: '1rem', width: '25%', minWidth: '100px' }} onClick={() => navigate('/')} startIcon={<ArrowBackRounded/>}>Back to home</Button>
            <FormGroup>
              <FormControlLabel label="Re-narration mode" control={<Switch checked={renarrationMode} onChange={() => setRenarrationMode(!renarrationMode)} />} />
            </FormGroup>
            <Button sx={{ color: 'gray', fontSize: '1rem', width: '25%', minWidth: '100px' }} endIcon={<PreviewSharp/>}>Preview Re-narrated page</Button>
            <Button sx={{ color: 'gray', fontSize: '1rem', width: '25%', minWidth: '100px' }} endIcon={<PreviewOutlined/>}>Published Changes</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '900px' }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} onClick={handleClick} />
      )}
      {/* Dialog to show the content of the clicked element */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Clicked Element Content</DialogTitle>
        <DialogContent>
        <div dangerouslySetInnerHTML={{ __html: `<style>${clickedElementContent.css}</style>${clickedElementContent.html}<script>${clickedElementContent.js}</script>` }} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Renarration;

