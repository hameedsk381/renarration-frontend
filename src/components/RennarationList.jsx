import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRenarrationBlock } from '../redux/actions';
import { Box, Card, CardContent, CardMedia, Typography, Grid, IconButton, Tooltip, Button } from '@mui/material';
import AudioPlayer from 'react-audio-player'; // You can use a package like this for better audio controls
import RenarrationBlock from './RenarrationBlock';
import { useNavigate } from 'react-router-dom';

const RenarrationList = () => {
    const renarrationBlocks = useSelector(state => state.renarrationBlocks.renarrationBlocks);
 const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
              <Button variant='contained' sx={{mb:3}} onClick={()=>{navigate('/create-rennaration')}}>Back to editing</Button>
            <Grid container spacing={2}>
              
                {renarrationBlocks.map(block => (
                    <Grid item key={block.id} xs={12} sm={6} md={4} lg={3}>
                       <RenarrationBlock block={block} desc={block.description} noActions={true}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RenarrationList;
