import React, { useState, useRef, useCallback, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Add from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import Quill from 'quill'; // Import Quill
import 'quill/dist/quill.snow.css'; // Import Quill's Snow theme CSS
import { showSnackbar } from '../redux/actions/snackbarActions';
import HtmlToReact from './HtmlToReact'
import { Alert, Modal, TextField, useMediaQuery } from '@mui/material';


function Annotator({
  open,
  onClose,
  content,
  onSave,
  initialValue,
  onDelete,
  annotatedtags,
  title,
}) {
  const [quill, setQuill] = useState(null);
  const quillRef = useRef(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(annotatedtags);
  const [annotationtitle, setannotationTitle] = useState(title);
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    setTags(annotatedtags);
    setannotationTitle(title);
  }, [annotatedtags, title]);

  const setQuillRef = useCallback((ref) => {
    if (ref) {
      const q = new Quill(ref, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image', 'video'],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }, { list: 'unchecked' }],
            ['clean', 'code-block', 'formula'],
          ],
        },
      });
      if (initialValue) {
        q.clipboard.dangerouslyPasteHTML(initialValue);
      }
      setQuill(q);
      quillRef.current = q;
    }
  }, [initialValue]);

  const handleSave = (bodycontent, anntags, anntitle) => {
    onSave(content, bodycontent, anntags, anntitle);
    onClose();
  };

  const handleSubmit = () => {
    if (quill) {
      const submissionContent = quill.root.innerHTML;
      if (submissionContent.trim() === '<p><br></p>') {
        dispatch(showSnackbar('please annoate', 'info'));
        return;
      }
      if (tags.length === 0) {
        dispatch(showSnackbar('please add atleast one tag', 'info'));
        return;
      }
      if (!annotationtitle) {
        dispatch(showSnackbar('please give the title for annotation', 'info'));
        return;
      }
      handleSave(submissionContent, tags, annotationtitle);
    } else {
      // Quill instance is not available
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() !== '' && tags.length < 3 && !tags.includes(tagInput.trim())) {
      const updatedTags = [...tags, tagInput.trim()];
      setTags(updatedTags);
      setTagInput('');
    } else {
      dispatch(showSnackbar('Tags should not be repeated', 'error'));
    }
  };

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTagAdd();
    }
  };

  return isDesktop ? (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          px: 4,
          borderRadius: 2,
          maxWidth: '80%',
          maxHeight: '80%',
         
        }}
      >
     
        <Typography sx={{ fontSize: { xs: 16, md: 22 }, fontWeight: 'bold', fontFamily: 'sans-serif', textAlign: 'left', textTransform: 'uppercase', mt: 1, my: 2 }}>
          Add your annotation here
        </Typography>
        <Divider />
        <TextField size='small' value={annotationtitle} onChange={(e)=>setannotationTitle(e.target.value)}
  label="Annotation Title"
  variant="outlined"
  sx={{ mt: 2, mb: 2,width:'50%' }}
/>
<Divider />
        <Box sx={{ my: 2, maxHeight: '150px', overflow: 'auto' }}>
          <HtmlToReact content={content} />
        </Box>
        <Divider sx={{ mb: 2 }} variant="fullWidth" />
        <div ref={setQuillRef} style={{ height: '200px', marginBottom: '20px',overflow:'auto' }} />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} my={2} justifyContent={'space-between'}>
      
          <Stack direction={'row'} sx={{ display: tags.length >= 3 ? 'none' : 'block',border:'1px solid rgba(0, 0, 0, 0.12)' }} px={1}>
            <input
              placeholder="Enter tag"
              style={{ border: 'none', outline: 'none' }}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              hidden={tags.length >= 3}
            />
            <Button sx={{ display: tags.length >= 3 && 'none'}} startIcon={<Add />} onClick={handleTagAdd}>add</Button>
          </Stack>
          <Stack direction={'row'}>
         
         {tags.map((tag, index) => (
           <Chip variant='outlined' key={index} label={tag} style={{ margin: '0.3rem', marginRight: '5px' }} onDelete={() => handleDeleteTag(index)} />
         ))}
          
       </Stack>
          <Stack direction="row" spacing={3} mt={{ xs: 2, md: 0 }} mb={2} justifyContent={'space-between'}>
            {initialValue === '' ? <Button sx={{ fontSize: { xs: 10, md: 14 } }} variant="outlined" color="error" onClick={onClose}>cancel</Button>
              : <Button sx={{ fontSize: { xs: 10, md: 14 } }} variant="outlined" color="error" onClick={onDelete}>delete</Button>}
            <Button sx={{ fontSize: { xs: 10, md: 14 } }} variant="contained" color="success" onClick={handleSubmit} >
              {initialValue === '' ? 'Publish sweet' : 'Update Sweet'}
            </Button>
          </Stack>
        </Stack>
       
      
       
      </Container>
     
    </Modal>
  ) : (
    <Drawer
      open={open}
      anchor="bottom"
      onClose={onClose}
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
     <Container sx={{ width: '100%', height: '100%' }}>
        <Typography sx={{ fontSize: { xs: 16, md: 22 }, fontWeight: 'bold', fontFamily: 'sans-serif', textAlign: 'left', textTransform: 'uppercase', mt: 1, my: 2 }}>
          Add your annotation here
        </Typography>
        <Divider />
        <TextField size='small' value={annotationtitle} onChange={(e)=>setannotationTitle(e.target.value)}
  label="Annotation Title"
  variant="outlined"
  sx={{ mt: 2, mb: 2,width:'50%' }}
/>
<Divider />
        <Box sx={{ my: 2, maxHeight: '150px', overflow: 'auto' }}>
          <HtmlToReact content={content} />
        </Box>
        <Divider sx={{ mb: 2 }} variant="fullWidth" />
        <div ref={setQuillRef} style={{ height: '200px', marginBottom: '20px',overflow:'auto' }} />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} my={2} justifyContent={'space-between'}>
      
          <Stack direction={'row'} sx={{ display: tags.length >= 3 ? 'none' : 'block',border:'1px solid rgba(0, 0, 0, 0.12)' }} px={1}>
            <input
              placeholder="Enter tag"
              style={{ border: 'none', outline: 'none' }}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              hidden={tags.length >= 3}
            />
            <Button sx={{ display: tags.length >= 3 && 'none'}} startIcon={<Add />} onClick={handleTagAdd}>add</Button>
          </Stack>
          <Stack direction={'row'}>
         
         {tags.map((tag, index) => (
           <Chip variant='outlined' key={index} label={tag} style={{ margin: '0.3rem', marginRight: '5px' }} onDelete={() => handleDeleteTag(index)} />
         ))}
          
       </Stack>
          <Stack direction="row" spacing={3} mt={{ xs: 2, md: 0 }} mb={2} justifyContent={'space-between'}>
            {initialValue === '' ? <Button sx={{ fontSize: { xs: 10, md: 14 } }} variant="outlined" color="error" onClick={onClose}>cancel</Button>
              : <Button sx={{ fontSize: { xs: 10, md: 14 } }} variant="outlined" color="error" onClick={onDelete}>delete</Button>}
            <Button sx={{ fontSize: { xs: 10, md: 14 } }} variant="contained" color="success" onClick={handleSubmit} >
              {initialValue === '' ? 'Add Annotation' : 'Update Annotation'}
            </Button>
          </Stack>
        </Stack>
       
      
       
      </Container>
    </Drawer>
  );
}
export default Annotator;