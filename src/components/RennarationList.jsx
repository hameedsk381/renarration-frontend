import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography, Grid, IconButton, Tooltip, Button, CardActions } from '@mui/material';
import RenarrationBlock from './RenarrationBlock';
import { useNavigate } from 'react-router-dom';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';

const RenarrationList = () => {
    const rennaratedBlocks = useSelector(state => 
        state.annotation.annotatedBlocks.filter(block => block.rennarationStatus === true)
    );
    
    useEffect(()=>{
console.log(rennaratedBlocks);

    },[rennaratedBlocks])
 const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
              <Button variant='contained' sx={{mb:3}} onClick={()=>{navigate('/create-rennaration')}}>Back to editing</Button>
            <Grid container spacing={2}>

              
                {rennaratedBlocks && rennaratedBlocks.map(block => (
                    <Grid item key={block.id} xs={12} sm={6} md={4} lg={3}>
                     <Card>
    <CardMedia>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 1 }}>
        {extractMedia(block.content).map((src, index) => (
            <Box
                key={index}
                component="img"
                sx={{
                    width: '50%',
                    height: 'auto',
                    objectFit: 'cover',
                    p: 0.5,
                }}
                src={src}
                alt={`Renarration image ${index + 1}`}
            />
        ))}

    </Box>
    </CardMedia>
    <CardContent>
        <div dangerouslySetInnerHTML={{ __html: removeMedia(block.content)}} />
        <Typography>{block.desc}</Typography>
        <Box
              
                component="img"
                sx={{
                    width: '50%',
                    height: 'auto',
                    objectFit: 'cover',
                    p: 0.5,
                }}
                src={block.img}
                alt={`Renarration image `}
            />
    </CardContent>
 
    {/* {del && <CardActions>
        <Button startIcon={<Delete/>} onClick={deleteRennarationBlock(block.id)}>Delete</Button>
        </CardActions>} */}
</Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RenarrationList;
