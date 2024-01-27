import { Audiotrack, Cancel } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setAudio } from '../redux/actions';
import { useSelector } from 'react-redux';

const AudioInput = () => {
    const dispatch = useDispatch();
    const {audio} = useSelector(state => state.formdata)
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
  {audio && (
    <Box mt={2} position="relative">
      <audio controls src={URL.createObjectURL(audio)} />
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