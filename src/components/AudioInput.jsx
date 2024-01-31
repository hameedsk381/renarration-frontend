import { Audiotrack, Cancel } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setAudio } from '../redux/actions';
import { useSelector } from 'react-redux';

const AudioInput = ({data}) => {
    const dispatch = useDispatch();
 
  return (
    <Box mb={2}>
  <input
    accept="audio/*"
    style={{ display: 'none' }}
    id="raised-button-file-audio"
    multiple
    type="file"
    onChange={(e)=>{dispatch(setAudio(e.target.files[0]))}}
  />
  <label htmlFor="raised-button-file-audio">
    <Button variant="contained" component="span" startIcon={<Audiotrack />}>
      Upload Audio
    </Button>
  </label>
  {data && (
    <Box mt={2} position="relative">
      <audio controls src={URL.createObjectURL(data)} />
      <IconButton
        color="error"
        onClick={() => dispatch(setAudio(null))}
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        <Cancel />
      </IconButton>
    </Box>
  )}
</Box>
  )
}

export default AudioInput