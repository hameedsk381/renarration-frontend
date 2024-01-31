import { Cancel, VideoLibraryOutlined } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setVideo } from '../redux/actions';
import { useSelector } from 'react-redux';

const VideoInput = ({data}) => {
const dispatch = useDispatch();

  return (
    <Box mb={2}>
  <input
    accept="video/*"
    style={{ display: 'none' }}
    id="raised-button-file-video"
    multiple
    type="file"
    onChange={(e)=>(dispatch(setVideo(e.target.files[0])))}
  />
  <label htmlFor="raised-button-file-video">
    <Button variant="contained" component="span" startIcon={<VideoLibraryOutlined />}>
      Upload Video
    </Button>
  </label>
  {data && (
    <Box mt={2} position="relative">
      <video controls width="100%" src={URL.createObjectURL(data)} />
      <IconButton
        color="error"
        onClick={() => dispatch(setVideo(null))}
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        <Cancel />
      </IconButton>
    </Box>
  )}
</Box>
  )
}

export default VideoInput