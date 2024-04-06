import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { showSnackbar } from '../redux/actions/snackbarActions';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const Tags = ({addTags}) => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  // Function to handle adding tags
  const handleTagAdd = () => {
    if (tagInput.trim() !== '' && tags.length < 3 && !tags.includes(tagInput.trim())) {
      const updatedTags = [...tags, tagInput.trim()]; // Update tags array
      setTags(updatedTags);
      setTagInput(''); // Clear input
   addTags(updatedTags);
    } else {
      dispatch(showSnackbar('Tags should not be repeated', 'error'));
    }
  };

  const handleDelete = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTagAdd();
    }
  };

  return (
  <Stack >
    <Stack  direction={'row'} sx={{ border: tags.length >= 3 ? 'none' : '1px solid rgba(0, 0, 0, 0.12)' }} px={1}>
      
      <input
        placeholder="Enter tag"
        style={{ border: 'none', outline: 'none' }}
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleInputKeyDown}
        hidden={tags.length >= 3}
      />
      <Button   hidden={tags.length >= 3} startIcon={<Add/>} onClick={handleTagAdd}>add</Button>
    </Stack>
   <Stack direction={'row'}>
   {tags.map((tag, index) => (
        <Chip variant='outlined' key={index} label={tag} style={{ margin: '0.3rem', marginRight: '5px' }} onDelete={() => handleDelete(index)} />
      ))}
   </Stack>
  </Stack>
  );
};

export default Tags;
