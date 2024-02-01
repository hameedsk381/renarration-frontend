import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography, Grid, IconButton, Tooltip, Button, CardActions, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';

const RenarrationList = () => {
    const renarratedBlocks = useSelector(state => 
        state.annotation.annotatedBlocks.filter(block => block.renarrationStatus === true)
    );
    const navigate = useNavigate();

    useEffect(() => {
        console.log(renarratedBlocks);
    }, [renarratedBlocks]);

    const createObjectURL = (media) => {
        if (media && (media instanceof Blob || media instanceof File)) {
            return URL.createObjectURL(media);
        }
        return null;
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Button variant='contained' sx={{mb:3}} onClick={() => navigate('/create-renarration')}>Back to editing</Button>
            <Grid container spacing={2}>
                {renarratedBlocks.map(block => (
                    <Grid item key={block.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 1 }}>
                                    {extractMedia(block.content).map((src, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            sx={{ width: '50%', height: 'auto', objectFit: 'cover', p: 0.5 }}
                                            src={src}
                                            alt={`Renarration image ${index + 1}`}
                                        />
                                    ))}
                                </Box>
                            </CardMedia>
                            <CardContent>
                                <div dangerouslySetInnerHTML={{ __html: removeMedia(block.content) }} />
                                <Paper variant='outlined' sx={{ p: 2, my: 3 }}>
                                    {block.img && <img src={createObjectURL(block.img)} alt="Renarration" width="100%" />}
                                    <Typography my={2}>{block.desc}</Typography>
                                    {block.aud && <audio controls src={createObjectURL(block.aud)} />}
                                    {block.vid && <video controls width="100%" src={createObjectURL(block.vid)} />}
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RenarrationList;
