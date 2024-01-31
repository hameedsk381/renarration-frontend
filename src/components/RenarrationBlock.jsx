import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import extractMedia from '../utils/extractMedia'
import removeMedia from '../utils/removeMedia'
import { useNavigate } from 'react-router'

import removeOutlineFromElement from '../utils/removeOutline'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { removeAnnotatedBlock, setAnnotatedHtmlContent } from '../redux/actions/annotationActions'
import { Delete } from '@mui/icons-material'
import { removeRennaratedBlock } from '../redux/actions/rennarationActions'

const RenarrationBlock = ({block,del,desc,noActions}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const  {htmlforAnnotation}  = useSelector(state => state.annotation)
    const deleteBlock = (blockId) => {
        // Dispatch action to delete the block
        dispatch(removeAnnotatedBlock(blockId));
    console.log(typeof(htmlforAnnotation));
        // Remove outline from the element in htmlContent
        const updatedHtmlContent = removeOutlineFromElement(htmlforAnnotation, blockId);
    
        // Optional: Dispatch an action to update the htmlContent in Redux
        dispatch(setAnnotatedHtmlContent(updatedHtmlContent));
    };
    const deleteRennarationBlock = (id)=>{
        dispatch(removeRennaratedBlock(id));
    }
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
        {block.rennarationStatus ? 'Update' : 'Create'}
    </Button>
        <Button size="small" color="primary" onClick={() => deleteBlock(block.id)}>
            Delete
        </Button>
    </CardActions>}
    {del && <CardActions>
        <Button startIcon={<Delete/>} onClick={deleteRennarationBlock(block.id)}>Delete</Button>
        </CardActions>}
</Card>
  )
}

export default RenarrationBlock