import axios from 'axios';
import { uploadFileApi } from '../apis/extractApis';
// Function to handle uploading file to API
const uploadFileToApi = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(uploadFileApi, formData);
    const { data } = response;
    // console.log(data);
    return data;
  } catch (error) {
    // console.error('Error uploading file to API:', error.message);
    return null;
  }
};
// Function to process media file object
const processMedia = async (media) => {
  if (media) {
    // Upload file to API
    const uploadedUrl = await uploadFileToApi(media);
    if (uploadedUrl) {
      return uploadedUrl;
    }
  }
  return null;
};
// Function to process all renarrated blocks
const processAnnotatedBlocks = async (AnnotatedBlocks) => {
  // Iterate through each block
  for (const block of AnnotatedBlocks) {
    const { body } = block;
    const { media} = body; // Destructure img and aud from body

    // Process HTML string
    const processedMedia = await processMedia(media.fileData);
   
    // Update block body with modified HTML string and img, aud files
    body.media.fileData = processedMedia;
   
  }

  // Return modified renarrated blocks
  return AnnotatedBlocks;
};

export default processAnnotatedBlocks;
