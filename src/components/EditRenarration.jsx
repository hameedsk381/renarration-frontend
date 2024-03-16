import React, { useState } from 'react';
import EditRenarrationModal from './EditRenarrationModal';
import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';

function EditRenarration({ renarrationId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button  variant='contained' startIcon={<Edit/>} onClick={() => setIsModalOpen(true)} size='small' >Edit </Button>
      <EditRenarrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        renarrationId={renarrationId}
      />
    </>
  );
}
export default EditRenarration;