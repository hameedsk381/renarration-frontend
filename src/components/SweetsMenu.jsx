import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ExpandMore } from '@mui/icons-material';
import {
  Box, Chip, Divider, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sweetsbyurl } from '../apis/extractApis';

function SweetsMenu({ options }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accordionWidth, setAccordionWidth] = useState(null);
  const [urlsweets, setUrlsweets] = useState(0);
  const currentUrl = useSelector((state) => state.url.currentUrl);
  const navigate = useNavigate();
  const fetchResponse = async () => {
    try {
      const response = await axios.post(sweetsbyurl, { source: currentUrl });
      setUrlsweets(response.data);

      // Handle the response as needed
    } catch (error) {
      // Handle any errors from the fetch
    }
  };
  useEffect(() => {
    fetchResponse();
  }, [currentUrl]);
 
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (sweetid) => {
    navigate(`/sweet/${sweetid}`);
    handleMenuClose();
  };

  const handleAccordionResize = (contentRect) => {
    // Update accordion width when it's resizedx
    setAccordionWidth(contentRect.bounds.width);
  };
  return (
    <Accordion
      expanded={Boolean(anchorEl)}
      onChange={handleMenuOpen}
      onResize={handleAccordionResize}
      sx={{ width: '300px' }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography color="primary">
          No of sweets for this url :
        </Typography>
        <Chip sx={{ mx: 2 }} color="info" size="small" label={urlsweets && urlsweets.length} variant="filled" />

      </AccordionSummary>
      <AccordionDetails>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          getcontentanchorel={null}
          PaperProps={{
            elevation: 0,
            style: {
              width: accordionWidth, overflow: 'auto', marginTop: '10px',
            },
          }}
        >
          {urlsweets && urlsweets.map((option, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <MenuItem
                sx={{ width: '268px' }} onClick={() => handleMenuItemClick(option)}
                style={{ width: accordionWidth }}
              >
                sweet
                {' '}
                {index + 1 }
              </MenuItem>
              <Divider />
            </Box>
          ))}
        </Menu>
      </AccordionDetails>
    </Accordion>
  );
}

export default SweetsMenu;
