import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import extractMedia from "../utils/extractMedia";
import { Edit, NearMe } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Annotator from "./Annotator";
import { removeAnnotatedBlock, updateAnnotatedBlock } from "../redux/actions/annotationActions";
import { useNavigate } from "react-router-dom";
import removeMedia from "../utils/removeMedia";
import { red } from "@mui/material/colors";


function RenarrationBlock({ block , editing ,noTags,searchmode}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  const [clickedElementContent, setClickedElementContent] = useState('');
  const [initialBodycontent, setInitialBodyContent] = useState('');
  const [tags, setTags] = useState([]);
  const [annotationtitle, setannotationTitle] = useState('');
  const handleEdit = (id, elementcontent, bodycontent,tags,title) => {
    console.log(elementcontent,bodycontent);
    setCurrentBlockId(id);
    setOpenDialog(true);
    setClickedElementContent(elementcontent);
    setInitialBodyContent(bodycontent);
    setTags(tags);
    setannotationTitle(title);
  };
  const handleSave = (htmlContent, annotationContent,tags,anntitle) => {
    const existingBlockIndex = annotatedBlocks.findIndex((block) => block.target.id === currentBlockId);

    const existingBlock = annotatedBlocks[existingBlockIndex];

    // Update the body value of the existing block
    const updatedBlock = {
      ...existingBlock,
      tags:tags,
      body: {
        ...existingBlock.body,
        title:anntitle,
        value: annotationContent, // Update this with the new body value
      },
    };

    // Dispatch the action to update the annotated block
    dispatch(updateAnnotatedBlock(existingBlock.target.id, updatedBlock));
    setOpenDialog(false);
  };
  const deleteBlock = () => {
    // Dispatch action to delete the block
    dispatch(removeAnnotatedBlock(currentBlockId));

    // setSnackbarMessage('Block deleted successfully');
    // setSnackbarOpen(true);
    setOpenDialog(false);
  };

  return (
    <Box py={4} px={2}>
    {/* <Card elevation={0} sx={{width:'100%',pb:3,px:0}}>
      <CardHeader
   
        action={
         editing ?  <Button onClick={() => handleEdit(block.target.id, block.target.value, block.body.value,block.tags,block.body.title)} size='small' startIcon={<Edit />}>Edit</Button> : <Button variant="outlined" color='success' size="small" endIcon={<NearMe />} sx={{fontSize:{xs:8,md:12,mr:4}}} onClick={()=>{navigate(`/sweet/${block._id}`)}} >read original site</Button>

        }
        title={
      
        <h2>
  {block.body.title.charAt(0).toUpperCase() + block.body.title.slice(1)} 
        </h2>
       
      
}
       
      />
      
                <CardContent component={Stack} direction={{ xs: 'column-reverse', md: 'row' }} justifyContent={'space-between'} sx={{width:'100%',px:4}} gap={6}>
                <Stack dangerouslySetInnerHTML={{ __html: removeMedia(block.body.value) }} style={{width:'100%',maxHeight: '100%',overflow:'auto'}} />
                
              <div style={{width:'50%',alignItems:'center'}}>
              <CardMedia 
                    component="img"
                 sx={{width:'100%' ,objectFit:'contain',m:'auto'}}
                    image={extractMedia(block.body.value)[0]}
                    alt={null}
                  />
              </div>
            
                </CardContent>
              <Stack mx={4} direction={'row'}>
              {!noTags && block.tags.map((tag, index) => (
          <Chip variant='filled' key={index} label={tag} style={{ margin: '0.3rem', fontSize: '0.8rem' }} sx={{fontWeight:'400'}}  />
        ))}
              </Stack>
                </Card> */}
   
             {editing ? <Stack direction={'row'} justifyContent={'space-between'}  mb={3} >
             <Typography fontSize={{ xs: 30, md: 36 }} fontWeight={'semibold'} style={{ textTransform: 'capitalize' }}>{block.body.title}</Typography>
                <Button onClick={() => handleEdit(block.target.id, block.target.value, block.body.value,block.tags,block.body.title)} size='small' startIcon={<Edit />}>Edit</Button>
              </Stack> :  <Stack direction={'row'} justifyContent={'space-between'} my={2}>
              <Typography fontSize={{ xs: 30, md: 36 }} fontWeight={'semibold'} style={{textTransform:'capitalize'}}>{block.body.title}</Typography>
           <div>
           <Button variant="outlined" color='success' size="small" endIcon={<NearMe />} sx={{fontSize:{xs:8,md:12}}} onClick={()=>{navigate(`/sweet/${block._id}`)}} >read original site</Button>
           </div>
   </Stack>}
  <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={3}>
  <Stack
               px={2} width={{ xs: '100%', md: '50%' }}
              >
                 
                <div dangerouslySetInnerHTML={{ __html: removeMedia(block.body.value) }} />
              </Stack>
           
              <Stack  width={{ xs: '100%', md: '50%' }}  >
             
              <img 
                   
                 style={{objectFit:'contain',m:'auto'}}
                    src={extractMedia(block.body.value)[0]}
                    alt={null}
                  />
             
              </Stack>
            
  </Stack>
            <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
        onDelete={deleteBlock}
        initialValue={initialBodycontent}
        annotatedtags={tags}
        title={annotationtitle}
      />
    </Box>
  );
}

export default RenarrationBlock;
