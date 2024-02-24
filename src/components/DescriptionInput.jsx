import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { setDescription } from '../redux/actions';

function DescriptionInput({ data }) {
  const dispatch = useDispatch();

  return (
    <TextField
      label="Description"
      multiline
      rows={4}
      variant="outlined"
      fullWidth
      value={data}
      onChange={(e) => dispatch(setDescription(e.target.value))}
      required
    />
  );
}

export default DescriptionInput;
