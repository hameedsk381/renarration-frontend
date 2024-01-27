import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import extractMedia from '../utils/extractMedia'
import removeMedia from '../utils/removeMedia'
import { useNavigate } from 'react-router'
import { deleteRenarrationBlock, updateHtmlContent } from '../redux/actions'
import removeOutlineFromElement from '../utils/removeOutline'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const RenarrationBlock = ({block,noActions,desc}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const htmlContent = useSelector(state => state.url.htmlContent)
    const deleteBlock = (blockId) => {
        // Dispatch action to delete the block
        dispatch(deleteRenarrationBlock(blockId));
    
        // Remove outline from the element in htmlContent
        const updatedHtmlContent = removeOutlineFromElement(htmlContent, blockId);
    
        // Optional: Dispatch an action to update the htmlContent in Redux
        dispatch(updateHtmlContent(updatedHtmlContent));
    };
  return (
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
        <Typography>{desc}</Typography>
    </CardContent>
 { !noActions &&  <CardActions>
    <Button size="small" color="primary" onClick={()=>{navigate('/edit-rennaration', { state: block.id })}}>
        {block.description !== null ? 'Update' : 'Create'}
    </Button>
        <Button size="small" color="primary" onClick={() => deleteBlock(block.id)}>
            Delete
        </Button>
    </CardActions>}
</Card>
  )
}

export default RenarrationBlock