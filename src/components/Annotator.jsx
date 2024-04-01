import React, { useRef, useCallback} from 'react';
import {
  Drawer, Box, Typography, Divider, Container, Button, ButtonGroup, Stack, IconButton,
} from '@mui/material';
import HtmlToReact from './HtmlToReact';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
  Audiotrack, Close, Image, VideoCameraBack,
} from '@mui/icons-material';

function Annotator({
  open, onClose, content, onSave, initialValue, onDelete,
}) {
  const editorRef = useRef(null);
  const handleSave = (bodycontent) => {
    onSave(content, bodycontent);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const setSunEditorRef = useCallback((ref) => {
    if (ref) {
    
      editorRef.current = ref;
      // console.log(editorRef)
    } else {
      // console.log('Editor reference is null or undefined');
    }
  }, []);

  const handleSubmit = () => {
    // console.log('Submit button clicked');
    if (editorRef.current) {
      const submissioncontent = editorRef.current.getContents();
      // console.log('Editor content:', content);
      handleSave(submissioncontent);
    } else {
      // console.log('Editor ref is not available');
    }
  };
  const handleUploadVideo = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'video/*,max-size=20000');
    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        const videoBlob = await fetch(URL.createObjectURL(file)).then((r) => r.blob());
        const videoUrl = URL.createObjectURL(videoBlob);
        const sunEditor = editorRef.current;
        // console.log(sunEditor);
        sunEditor.insertHTML(`<video controls src="${videoUrl}"></video>`);
      }
    });
    fileInput.click();
  };
  const handleAudioUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'audio/*,max-size=20000');
    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        const audioBlob = await fetch(URL.createObjectURL(file)).then((r) => r.blob());
        const audioUrl = URL.createObjectURL(audioBlob);
        const sunEditor = editorRef.current;
        // console.log(sunEditor);
        sunEditor.insertHTML(`<audio controls src="${audioUrl}"></audio>`);
      }
    });
    fileInput.click();
  };
  const handleImageUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*,max-size=20000');
    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        const imgBlob = await fetch(URL.createObjectURL(file)).then((r) => r.blob());
        const imgUrl = URL.createObjectURL(imgBlob);
        const sunEditor = editorRef.current;
        // console.log(sunEditor);
        sunEditor.insertHTML(`<img controls src="${imgUrl}"></img>`);
      }
    });
    fileInput.click();
  };
  return (
    <Drawer
      open={open}
      anchor="bottom"
      onClose={handleClose}
      sx={{
        '.MuiDrawer-paper': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px',
        },
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        onClick={onClose}
      >
        <Close />
      </IconButton>
      <Container sx={{ width: '100%', height: '100%' }}>
        <Typography sx={{ fontSize: { xs: 16, md: 22 }, fontWeight: 'bold', fontFamily: 'sans-serif', textAlign: 'left', textTransform: 'uppercase', mt: 1, my: 2 }}>
          Add your annotation here
        </Typography>
        <Divider />
        <Box sx={{ my: 2, maxHeight: '130px', overflow: 'auto' }}>
          <HtmlToReact content={content} />
        </Box>
        <Divider sx={{ mb: 2 }} variant="fullWidth" />
        <SunEditor
          defaultValue={initialValue}
          getSunEditorInstance={setSunEditorRef}
          autoFocus
          setOptions={{
            mode: 'balloon-always',
            audioUrlInput: true,
            buttonList: [
              ['undo', 'redo'],
              ['font', 'fontSize', 'formatBlock'],
              ['paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              '/', // Line break
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['table', 'link'], 
              ['fullScreen', 'showBlocks', 'codeView'],
              ['preview', 'print'],
              ['save', 'template'],
              ['dir', 'dir_ltr', 'dir_rtl'],
            ],
          }}
          onAudioUpload={handleAudioUpload}
          height="200px"
          placeholder="Type your content here.."
        />
        <Stack m={2} justifyContent="space-between" direction={{ xs: 'column', md: 'row' }}>
          <ButtonGroup variant="contained" size="small">
            <Button sx={{fontSize:{xs:8,md:14}}} startIcon={<VideoCameraBack />} onClick={handleUploadVideo}>Upload Video</Button>
            <Button sx={{fontSize:{xs:8,md:14}}} startIcon={<Audiotrack />} onClick={handleAudioUpload}>Upload Audio</Button>
            <Button sx={{fontSize:{xs:8,md:14}}} startIcon={<Image />} onClick={handleImageUpload}>Upload image</Button>
          </ButtonGroup>
          <Stack direction="row" spacing={3} justifyContent={'space-between'} mt={{xs:2,md:0}}>
            {initialValue === '' ? <Button sx={{fontSize:{xs:8,md:14}}} variant="outlined" color="error"
             onClick={handleClose}>cancel</Button>
             : <Button sx={{fontSize:{xs:8,md:14}}} variant="outlined" color="error" onClick={onDelete}>delete</Button>}
            <Button sx={{fontSize:{xs:8,md:14}}} variant="contained" color="success" onClick={handleSubmit}>
              {initialValue === '' ? 'ADD to Re-narration' : 'Update Re-narration'}
              </Button>
          </Stack>
        </Stack>
      </Container>
    </Drawer>
  );
}

export default Annotator;
