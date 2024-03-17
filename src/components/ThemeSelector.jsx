import React from 'react';
import { useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { setTheme } from '../redux/actions/themeActions.js';
import { themes } from '../themes/themes.js';

const ThemeSelector = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setTheme(event.target.value));
  };

  return (
    <Select variant='standard' disableUnderline onChange={handleChange} defaultValue={themes[0].name}>
      {themes.map((theme => (<MenuItem value={theme.name}>{theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}</MenuItem>)))}
     
    </Select>
  );
};

export default ThemeSelector;
