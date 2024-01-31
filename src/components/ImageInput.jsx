import { Cancel, Image } from '@mui/icons-material';
import { Box, Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setImage } from '../redux/actions';
import { useSelector } from 'react-redux';

const ImageInput = ({data}) => {
    const dispatch = useDispatch();
   
  
  return (
    <Box mb={2}>
  <input
    accept="image/*"
    style={{ display: 'none' }}
    id="raised-button-file-image"
    multiple
    type="file"
    onChange={(e)=>{dispatch(setImage(e.target.files[0]))}}
  />
  <label htmlFor="raised-button-file-image">
    <Button variant="contained" component="span" startIcon={<Image />}>
      Upload Image
    </Button>
    
  </label>
  {data && <Button variant='outlined'  startIcon={<Cancel/>} onClick={()=>{dispatch(setImage(null))}}>Cancel</Button>}
  {data && (
    <Box mt={2} position="relative">
      <img src={URL.createObjectURL(image)} alt="Preview" width="100%" />
    </Box>
  )}
</Box>
  )
}

export default ImageInput