// Modal.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Paper } from '@mui/material';
import { closeModal } from '../redux/actions/modalActions';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'relative',
    p: 4,
  };


export default function CommonModal() {
    const isOpen = useSelector(state => state.modal.isOpen);
  const content = useSelector(state => state.modal.content);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Paper sx={style}>
       {content}
       </Paper>
      </Modal>
   
  );
}