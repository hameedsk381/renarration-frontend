import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { setTheme } from '../redux/actions/themeActions.js';
import themes from '../themes/themes';

function ThemeSelector() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const handleChange = (event) => {
    dispatch(setTheme(event.target.value));
  };

  return (
    <Select variant="standard" disableUnderline onChange={handleChange} value={currentTheme} defaultValue={currentTheme}>
      {themes.map((theme) => (
        <MenuItem key={theme.name} value={theme.name}>
          {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
        </MenuItem>
      ))}
    </Select>
  );
}

export default ThemeSelector;
