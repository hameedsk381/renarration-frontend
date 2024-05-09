import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadFile = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const mappedFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(current => [...current, ...mappedFiles]);
    onFileUpload(mappedFiles); // pass files to parent component for further processing
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'audio/*,video/*,image/*' });

  const removeFile = file => {
    const newFiles = files.filter(f => f !== file);
    setFiles(newFiles);
    URL.revokeObjectURL(file.preview); // clean up memory
  };

  const filePreviews = files.map(file => (
    <Box key={file.path} sx={{ p: 2, border: '1px solid #ccc', marginBottom: 2, position: 'relative' }}>
      <Typography variant="body2">{file.path} - {file.size} bytes</Typography>
      {file.type.startsWith('image') && <img src={file.preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
      <IconButton onClick={() => removeFile(file)} size="small" sx={{ position: 'absolute', top: 0, right: 0 }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  ));

  return (
    <div>
      <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', p: 4, textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Box>
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Files</Typography>
          {filePreviews}
        </Box>
      )}
    </div>
  );
};

export default UploadFile;
