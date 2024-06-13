import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../redux/actions/urlActions";
import { resetAnnotations } from "../redux/actions/annotationActions";
import { closeModal } from "../redux/actions/modalActions";
import { addRennarationId, addRennarationTitle } from "../redux/actions/rennarationActions";
import { Alert, Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import PropTypes from 'prop-types';

const Confirmation = ({ type, onConfirm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sweetType, setSweetType] = useState('public');

  const handleAccept = () => {
    console.log('Accepted');

    if (type === 'exit') {
      dispatch(resetState());
      dispatch(resetAnnotations());
      dispatch(addRennarationTitle(''));
      dispatch(addRennarationId(''));
      localStorage.removeItem('state'); // Clear specific item in local storage
      navigate('/'); // Navigate to the home page or any other page
    } else if (type === 'sweetType') {
      onConfirm(sweetType);
    }

    dispatch(closeModal());
  };

  const handleDecline = () => {
    console.log('Declined');
    dispatch(closeModal());
  };

  const renderMessage = () => {
    if (type === 'exit') {
      return "Are you sure you want to exit Sweet creation? This will delete all the edits you made so far!";
    } else if (type === 'sweetType') {
      return "Choose the type of sweet: Private or Public.Once you set to private no one can access it except you";
    }
  };

  const renderButtons = () => {
    if (type === 'exit') {
      return (
        <>
          <Button onClick={handleAccept}>Accept</Button>
          <Button onClick={handleDecline} color='error'>Cancel</Button>
        </>
      );
    } else if (type === 'sweetType') {
      return (
        <>
          <Button onClick={handleAccept}>Submit</Button>
          <Button onClick={handleDecline} color='error'>Cancel</Button>
        </>
      );
    }
  };

  const renderSweetTypeOptions = () => {
    if (type === 'sweetType') {
      return (
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="sweetType"
            name="sweetType"
            value={sweetType}
            onChange={(e) => setSweetType(e.target.value)}
          >
            <FormControlLabel value="private" control={<Radio />} label="Private" />
            <FormControlLabel value="public" control={<Radio />} label="Public" />
          </RadioGroup>
        </FormControl>
      );
    }
  };

  return (
    <>
      <Alert severity="warning">{renderMessage()}</Alert>
      {renderSweetTypeOptions()}
      <Stack direction="row" justifyContent="flex-end" mt={2}>
        {renderButtons()}
      </Stack>
    </>
  );
};

Confirmation.propTypes = {
  type: PropTypes.oneOf(['exit', 'sweetType']).isRequired,
  onConfirm: PropTypes.func,
};

export default Confirmation;
