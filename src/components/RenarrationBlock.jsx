import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import extractMedia from "../utils/extractMedia";
import { Edit, ReadMore, Speaker } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Annotator from "./Annotator";
import { removeAnnotatedBlock, updateAnnotatedBlock } from "../redux/actions/annotationActions";
import { useNavigate } from "react-router-dom";
import removeMedia from "../utils/removeMedia";

function RenarrationBlock({ block, editing, noTags }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const [clickedElementContent, setClickedElementContent] = useState('');
  const [initialBodyContent, setInitialBodyContent] = useState('');
  const [tags, setTags] = useState([]);
  const [mediafile, setMediafile] = useState({ fileData: null, fileType: null });

  const handleEdit = (id, elementcontent, bodycontent, tags, media) => {
    setCurrentBlockId(id);
    setOpenDialog(true);
    setClickedElementContent(elementcontent);
    setInitialBodyContent(bodycontent);
    setTags(tags);
    setMediafile(media);
  };

  const handleSave = (htmlContent, annotationContent, tags) => {
    const existingBlockIndex = annotatedBlocks.findIndex((block) => block.target.id === currentBlockId);
    const existingBlock = annotatedBlocks[existingBlockIndex];

    const updatedBlock = {
      ...existingBlock,
      tags: tags,
      body: {
        ...existingBlock.body,
        value: annotationContent,
      },
    };

    dispatch(updateAnnotatedBlock(existingBlock.target.id, updatedBlock));
    setOpenDialog(false);
  };

  const deleteBlock = () => {
    dispatch(removeAnnotatedBlock(currentBlockId));
    setOpenDialog(false);
  };

  const renderMedia = () => {
    const { fileData, fileType } = block.body.media || {};
    if (!fileData || !fileType) return null;

    const isFile = fileData instanceof File;
    const src = isFile ? URL.createObjectURL(fileData) : fileData;

    const commonStyle = {
      width: '260px',
      margin: 'auto',
      boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.1)',
      borderRadius: '20px',
    };

    if (fileType === 'audio/mpeg') {
      return (
        <audio controls style={commonStyle}>
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    }

    if (fileType === 'video/mp4') {
      return (
        <video controls style={commonStyle}>
          <source src={src} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      );
    }

    if (fileType === 'image/jpeg') {
      return (
        <img
          style={{ ...commonStyle, objectFit: 'contain' }}
          src={src}
          alt={null}
        />
      );
    }

    return null;
  };

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2,my:2,maxWidth:900 }}>
      <Stack justifyContent={'space-between'} direction={'row'} my={1}>
        <Typography>
          {!noTags && block.tags.map((tag, index) => (
            <Chip variant='filled' key={index} label={tag} size="small" style={{ margin: '0.3rem', fontSize: '0.8rem' }} sx={{ fontWeight: '400' }} />
          ))}
        </Typography>
        {editing &&
          <Button onClick={() => handleEdit(block.target.id, block.target.value, block.body.value, block.tags, block.body.media)} sx={{ fontSize: { xs: 8, md: 12 } }} size='small' startIcon={<Edit />}>Edit</Button>}
        <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'}>
          <Button color='success' size="small" endIcon={<ReadMore />} sx={{ fontSize: { xs: 12, md: 14 } }} onClick={() => { navigate(`/sweet/${block._id}`) }}>Read Original Story</Button>
          {/* <Button color="success" size="small" endIcon={<Speaker />} sx={{ fontSize: { xs: 8, md: 12 } }}>Listen</Button> */}
        </Stack>
      </Stack>
      <Stack direction={{ xs: 'column-reverse', md: 'row' }} variant="outlined" spacing={3}>
        <Stack px={2} width={{ xs: '100%', md: '50%' }}>
          <Stack my={2} width={{ xs: '280px', md: '100%', overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: removeMedia(block.body.value) }} />
        </Stack>
        <Stack py={4} width={{ xs: '100%', md: '50%' }}>
          {renderMedia()}
        </Stack>
      </Stack>

      <Annotator
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={clickedElementContent}
        onSave={handleSave}
        onDelete={deleteBlock}
        initialValue={initialBodyContent}
        annotatedtags={tags}
        mediafiles={mediafile}
      />
    </Paper>
  );
}

export default RenarrationBlock;
