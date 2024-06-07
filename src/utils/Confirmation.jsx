import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../redux/actions/urlActions";
import { resetAnnotations } from "../redux/actions/annotationActions";
import { closeModal } from "../redux/actions/modalActions";
import { Alert, Button, Paper, Stack } from "@mui/material";
import { addRennarationId, addRennarationTitle } from "../redux/actions/rennarationActions";

const Confirmation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAccept = () => {
      console.log('Accepted');
      dispatch(resetState());
      dispatch(resetAnnotations());
      dispatch(addRennarationTitle(''));
      dispatch(addRennarationId(''));
     localStorage.removeItem('state') // Clear specific item in local storage
      navigate('/'); // Navigate to the home page or any other page
      dispatch(closeModal())
    };
  
    const handleDecline = () => {
      console.log('Declined');
      dispatch(closeModal())
    };
  
    return (
      <>
       <Alert severity="warning">Are you sure you want to exit Sweet creation?
  This will delete all the edits you made so far!
  </Alert>
        <Stack direction="row" justifyContent="flex-end" mt={2}>
          <Button onClick={handleAccept}>Accept</Button>
          <Button onClick={handleDecline} color='error'>Cancel</Button>
        </Stack>
      </>
    );
  };
  export default Confirmation;