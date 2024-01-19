import React, { useState } from 'react';
import { Alert, Button, CircularProgress, Paper, Snackbar } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { wrapperStyle, inputStyle, buttonStyle } from './UrlInputStyles';
import { useUrlValidation } from '../../hooks/useUrlValidation';
import { useDownloadMutation } from '../../hooks/useDownloadMutation';

function UrlInput({ navigateTo }) {
    const [inputValue, setInputValue] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [mutationErrorSnackbarOpen, setMutationErrorSnackbarOpen] = useState(false);

    const navigate = useNavigate();
    const isValidUrl = useUrlValidation(inputValue);
    const mutation = useDownloadMutation(navigateTo, navigate, setSnackbarMessage, setMutationErrorSnackbarOpen);


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleNavigate = () => {
        if (isValidUrl) {
            mutation.mutate(inputValue);
            setInputValue('');
        } else {
            setSnackbarMessage("Invalid URL. Example: https://www.example.com");
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Paper elevation={6} sx={{ width: { lg: "50%", md: "75%" }, m: 2, marginTop: "-25px", marginInline: { lg: "25%", md: "10%" } }} style={wrapperStyle}>
                <input
                    type="url"
                    placeholder="Enter a URL, link you want to re-narrate with"
                    style={inputStyle}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <Button
                    endIcon={mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : <ArrowForward />}
                    onClick={handleNavigate}
                    style={buttonStyle}
                    sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    disabled={mutation.isLoading}
                >
                   Renarrate-now
                </Button>
            </Paper>
            <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
>
    <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%', whiteSpace: 'pre-line' }}>
        {snackbarMessage}
    </Alert>
</Snackbar>

<Snackbar
    open={mutationErrorSnackbarOpen}
    autoHideDuration={6000}
    onClose={() => setMutationErrorSnackbarOpen(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
>
    <Alert onClose={() => setMutationErrorSnackbarOpen(false)} severity="error" sx={{ width: '100%', whiteSpace: 'pre-line' }}>
        {snackbarMessage}
    </Alert>
</Snackbar>

        </>
    );
}

export default UrlInput;
