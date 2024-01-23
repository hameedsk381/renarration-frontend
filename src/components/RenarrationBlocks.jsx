import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteRenarrationBlock } from '../redux/actions';  // Adjust the path to your action creators
import { Link, Button, Card, CardActions, CardContent, Typography, Grid, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const RenarrationBlocks = ({ renarrationBlocks, deleteRenarrationBlock }) => {
    const navigate = useNavigate();
    useEffect(() => {
     console.log(renarrationBlocks[0].content.html)
    }, [])
    
    const handleDelete = (blockId) => {
        deleteRenarrationBlock(blockId);
    };
const handleNavigate = ()=>{
    navigate('/re-narrate');
}
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
                                <Typography variant="body2" color="text.secondary">
                                    Description: {block.description}
                                </Typography>
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

const mapStateToProps = (state) => ({
    renarrationBlocks: state.renarrationBlocks.renarrationBlocks,
});

const mapDispatchToProps = {
    deleteRenarrationBlock,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenarrationBlocks);
