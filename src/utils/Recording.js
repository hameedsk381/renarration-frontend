export const startRecording = async ({setMediaRecorder,setIsRecording,setAudioData,}) => {
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
export const stopRecording = () => {
    mediaRecorder && mediaRecorder.stop();
};