import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import extractMedia from "../utils/extractMedia";
import { Edit, NearMe, ReadMore, Speaker } from "@mui/icons-material";
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
  // const [annotationtitle, setannotationTitle] = useState('');
  const handleEdit = (id, elementcontent, bodycontent,tags) => {
    console.log(elementcontent,bodycontent);
    setCurrentBlockId(id);
    setOpenDialog(true);
    setClickedElementContent(elementcontent);
    setInitialBodyContent(bodycontent);
    setTags(tags);
    // setannotationTitle(title);
  };
  const handleSave = (htmlContent, annotationContent,tags) => {
    const existingBlockIndex = annotatedBlocks.findIndex((block) => block.target.id === currentBlockId);

    const existingBlock = annotatedBlocks[existingBlockIndex];

    // Update the body value of the existing block
    const updatedBlock = {
      ...existingBlock,
      tags:tags,
      body: {
        ...existingBlock.body,
        // title:anntitle,
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
    <Box py={4} >
    {/* <Typography fontSize={{ xs: 26, md: 36 }} fontWeight={'semibold'} style={{ textTransform: 'capitalize' }}>{block.body.title} </Typography> */}
    <Typography>
   {!noTags && block.tags.map((tag, index) => (
          <Chip variant='filled' key={index} label={tag} size="small" style={{ margin: '0.3rem', fontSize: '0.8rem' }} sx={{fontWeight:'400'}}  />
        ))}
              </Typography>     
  <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={3}>
  <Stack
               px={2} width={{ xs: '100%', md: '50%' }}
              >
                 
                <Stack my={2} width={{xs:'280px',md:'100%',overflow:'auto'}} dangerouslySetInnerHTML={{ __html: removeMedia(block.body.value) }} />
              </Stack>
           
            {extractMedia(block.body.value) !== null &&   <Stack py={4} width={{ xs: '100%', md: '50%' }}  >
             
             <img 
                  
                style={{objectFit:'contain',m:'auto',boxShadow: '8px 8px 8px 8px rgba(0, 0, 0, 0.1)'}}
                   src={extractMedia(block.body.value)[0]}
                   alt={null}
                 />
            
             </Stack>}
            
  </Stack>
  <Divider/>

        <Stack justifyContent={'space-between'} direction={'row'} my={1}>
      {editing &&   <Button onClick={() => handleEdit(block.target.id, block.target.value, block.body.value,block.tags)} sx={{fontSize:{xs:8,md:12}}} size='small' startIcon={<Edit />}>Edit</Button>}
     
       
<Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
<Button  color='success' size="small" endIcon={<ReadMore />} sx={{fontSize:{xs:8,md:12}}} onClick={()=>{navigate(`/sweet/${block._id}`)}} >read original story</Button>
<Button color="success" size="small" endIcon={<Speaker/>} sx={{fontSize:{xs:8,md:12}}}>Listen</Button>
  </Stack>     
        </Stack>
              <Divider/>
            <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
        onDelete={deleteBlock}
        initialValue={initialBodycontent}
        annotatedtags={tags}
        // title={annotationtitle}
      />
    </Box>
  );
}

export default RenarrationBlock;
