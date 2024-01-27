import { RecordVoiceOverOutlined } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const Recording = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioData, setAudioData] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const startRecording = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                setMediaRecorder(mediaRecorder);

                mediaRecorder.onstart = () => {
                    setIsRecording(true);
                };

                mediaRecorder.ondataavailable = (e) => {
                    setAudioData(e.data);
                };

                mediaRecorder.onstop = () => {
                    setIsRecording(false);
                };

                mediaRecorder.start();
            } catch (err) {
                console.error('Error accessing audio devices:', err);
            }
        } else {
            alert('Audio recording is not supported in this browser.');
        }
    };

    const stopRecording = () => {
        mediaRecorder && mediaRecorder.stop();
    };
    return (


        <Box mb={2} gap={2} mt={2}>
            {!isRecording ? (
                <Button variant='contained' startIcon={<RecordVoiceOverOutlined />} onClick={startRecording}>start recording</Button>
            ) : (
                <Button variant="contained" color="secondary" onClick={stopRecording}>
                    Stop Recording
                </Button>
            )}
            {audioData && <audio controls src={URL.createObjectURL(audioData)} />}

        </Box>
    )
}

export default Recording