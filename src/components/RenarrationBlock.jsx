import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import extractMedia from "../utils/extractMedia";
import { Edit, NearMe, Share } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Annotator from "./Annotator";
import { removeAnnotatedBlock, updateAnnotatedBlock } from "../redux/actions/annotationActions";
import ShareRenarration from "./Share";
import { useNavigate } from "react-router-dom";


function RenarrationBlock({ block , editing ,view}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const [currentBlockId, setCurrentBlockId] = useState(null); // State to hold the current block ID
  const [clickedElementContent, setClickedElementContent] = useState('');
  const [initialBodycontent, setInitialBodyContent] = useState();
  const [tags, setTags] = useState([]);
  const handleEdit = (id, elementcontent, bodycontent,tags) => {
    console.log(elementcontent,bodycontent);
    setCurrentBlockId(id);
    setOpenDialog(true);
    setClickedElementContent(elementcontent);
    setInitialBodyContent(bodycontent);
    setTags(tags)
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
    <>
  
             {editing &&  <Stack direction={'row'} justifyContent={'flex-end'}  >
                <Button onClick={() => handleEdit(block.target.id, block.target.value, block.body.value,block.tags)} size='small' startIcon={<Edit />}>Edit</Button>
              </Stack>}
           {view &&    <Stack direction={'row'} justifyContent={'flex-end'} my={2}>
           <Button variant="outlined" color='success' size="small" endIcon={<NearMe />} sx={{fontSize:{xs:8,md:12}}} onClick={()=>{navigate(`/sweet/${block._id}`)}} >read original site</Button>
   </Stack>}
              <Stack direction="row" spacing={1} justifyContent="center">
                {extractMedia(block.target.value).map((src, index) => (
                  <img
                    key={index}
                    style={{
                      width: '50%', height: 'auto', objectFit: 'cover', padding: 0.5,
                    }}
                    src={src}
                    alt={`Renarration  ${index + 1}`}
                  />
                ))}
              </Stack>
              <Box
                sx={{
                  px: 2
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: block.body.value }} />
              </Box>
           
            <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
        onDelete={deleteBlock}
        initialValue={initialBodycontent}
        annotatedtags={tags}
      />
    </>
  );
}

export default RenarrationBlock;
