// ReviewStep.js
import React from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import { Delete } from '@mui/icons-material';
const MediaBlock = ({ file, type, onDelete }) => {
    const handleDelete = () => {
      onDelete(file, type);
    };
  
    return (
      <Stack spacing={3} direction={'column'} my={5}>
        {type === 'audio' && <audio controls src={URL.createObjectURL(file)} />}
        {type === 'video' && <video controls src={URL.createObjectURL(file)} width="250" />}
        {type === 'image' && (
          <div style={{ position: 'relative' }}>
            <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '100%', objectFit: 'cover' }} />
         <IconButton style={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'white' }} onClick={handleDelete}>
            <Delete/>
         </IconButton>
                
          </div>
        )}
      </Stack>
    );
  };
const ReviewStep = ({ pageBlocks, audioFiles, videoFiles, imageFiles, onDeleteMedia }) => (
    <Container>
        {pageBlocks.map((block, index) => (
            <div key={index}>{block.title}</div> // Simplified rendering, adjust as needed
        ))}
        <Stack spacing={3}>
            {audioFiles.map((file, index) => <MediaBlock key={index} file={file} type="audio" onDelete={() => onDeleteMedia(file, 'audio')} />)}
            {videoFiles.map((file, index) => <MediaBlock key={index} file={file} type="video" onDelete={() => onDeleteMedia(file, 'video')} />)}
            {imageFiles.map((file, index) => <MediaBlock key={index} file={file} type="image" onDelete={() => onDeleteMedia(file, 'image')} />)}
        </Stack>
    </Container>
);
export default ReviewStep;