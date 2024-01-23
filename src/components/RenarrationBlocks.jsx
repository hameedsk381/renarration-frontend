import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRenarrationBlock, updateHtmlContent } from '../redux/actions'; // Adjust the path to your action creators
import { Link, Button, Card, CardActions, CardContent, Typography, Grid, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const RenarrationBlocks = () => {
    const renarrationBlocks = useSelector(state => state.renarrationBlocks.renarrationBlocks);
    const htmlContent = useSelector(state => state.url.htmlContent); 
    const dispatch = useDispatch(); // Get the dispatch function
    const navigate = useNavigate();
    function removeOutlineFromElement(htmlString, dataId) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
    
        const targetElement = doc.querySelector(`[data-id="${dataId}"]`);
        if (targetElement) {
            targetElement.style.outline = ''; // Remove the outline style
        }
    
        const serializer = new XMLSerializer();
        const modifiedHtmlString = serializer.serializeToString(doc);
        return modifiedHtmlString;
    }
    
    const handleDelete = (blockId) => {
        // Dispatch action to delete the block
        dispatch(deleteRenarrationBlock(blockId));
    
        // Remove outline from the element in htmlContent
        const updatedHtmlContent = removeOutlineFromElement(htmlContent, blockId);
    
        // Optional: Dispatch an action to update the htmlContent in Redux
        dispatch(updateHtmlContent(updatedHtmlContent));
    };
    

    const handleNavigate = () => {
        navigate('/re-narrate');
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom sx={{ marginY: 4 }}>
                Renarration Blocks
            </Typography>
            <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} onClick={handleNavigate}>
                Back to Renarrate
            </Button>
            <Grid container spacing={4} sx={{ marginTop: 2 }}>
                {renarrationBlocks.map(block => (
                    <Grid item key={block.id} xs={12} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <div dangerouslySetInnerHTML={{ __html: block.content.html }} />
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleDelete(block.id)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RenarrationBlocks;
