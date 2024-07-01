import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { setTheme } from '../redux/actions/themeActions.js';
import themes from '../themes/themes';

function ThemeSelector() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const handleChange = (event) => {
    dispatch(setTheme(event.target.value));
  };

  return (
    <FormControl variant="standard">
      <InputLabel id="theme-select-label">Choose Theme</InputLabel>
      <Select labelId="theme-select-label" id="theme-select" value={currentTheme} onChange={handleChange} disableUnderline>
        {themes.map((theme) => (
          <MenuItem key={theme.name} value={theme.name}>
            {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ThemeSelector;
