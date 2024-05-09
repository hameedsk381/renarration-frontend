import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ExpandMore } from '@mui/icons-material';
import {
  Box, Button, Chip, Divider, Paper, Stack, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { sweetsbyurl } from '../apis/extractApis';




export default function SweetsMenu({ options }) {
  const [urlsweets, setUrlsweets] = useState([]);
  const currentUrl = useSelector((state) => state.url.currentUrl);
const [showMenu,setShowmenu] = useState(false);

  const fetchResponse = async () => {
    try {
      const response = await axios.post(sweetsbyurl, { source: currentUrl });
      setUrlsweets(response.data);
    } catch (error) {
      // Handle any errors from the fetch
    }
  };

  const handleSweetChange = () => {
setShowmenu(!showMenu)
  };

  useEffect(() => {
    fetchResponse();
    console.log(urlsweets)
  }, [currentUrl]);

  return (
    <div >
      <Button disableRipple disabled={urlsweets.length === 0} variant='contained' onClick={handleSweetChange} style={{ width: '100%', paddingInline: '10px', borderRadius: '5px', border: '1px solid #ccc',margin:'5px',backgroundColor:"white",color:'black' }}>
        No of sweets for this url : <Chip label={urlsweets.length} variant="filled" color='info' size='small' sx={{mx:1}}></Chip>
      </Button>
     {showMenu && <Paper component={'ul'} style={{ listStyle: 'none', margin: 0, paddingInline: '5px', position: 'absolute', zIndex: 9999, width: '270px' }}>
            {urlsweets.map((option, index) => (
               <Stack component={'li'} key={index} style={{ paddingInline: '8px', width: '270px' }}>
                <Typography component={Link} 
                  to={`/sweet/${option._id}`}
                  style={{
                    padding: '10px',
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: index !== urlsweets.length - 1 ? '1px solid #e0e0e0' : 'none',textAlign:'left'
                  }}
                >
                  {option.body.title} 
                </Typography>
               </Stack>
            ))}
          </Paper>}
    </div>
  );
}


