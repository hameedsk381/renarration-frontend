import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDescription } from '../redux/actions';
import { TextField } from '@mui/material';

const DescriptionInput = ({desc}) => {
    const dispatch = useDispatch();

  return (
    <TextField
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={desc}
        onChange={(e)=>dispatch(setDescription(e.target.value))}
    />
  )
}

export default DescriptionInput