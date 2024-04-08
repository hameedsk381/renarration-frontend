import axios from 'axios';
import { uploadFileApi } from '../apis/extractApis';

// Function to handle uploading file to API
const uploadBlobToApi = async (blob) => {
  try {
    const formData = new FormData();
    formData.append('file', blob, 'mediafile');
    const response = await axios.post(uploadFileApi, formData);
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error uploading blob to API:', error.message);
    return null;
  }
};
// Function to process HTML string with media tags having blob URLs
const processHtmlString = async (htmlString) => {
  // Parse HTML string to extract media tags (img, audio, video)
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Extract media tags
  const mediaTags = [...doc.querySelectorAll('img, audio, video')];

  // Process each media tag
  for (const mediaTag of mediaTags) {
    const src = mediaTag.getAttribute('src');
    if (src && src.startsWith('data:')) {
      // Convert data URL to file
      const [, base64Data] = src.split(',');
      const mimeType = src.match(/data:([^;]+);/)[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new File([byteArray], 'mediafile', { type: mimeType });
      // Upload file to API
      const uploadedUrl = await uploadBlobToApi(file);
      if (uploadedUrl) {
        // Replace src attribute with API response
        mediaTag.setAttribute('src', uploadedUrl);
      }
    }
  }

  // Return modified HTML string
  return doc.documentElement.outerHTML;
};

// Function to process all renarrated blocks
const processRenarratedBlocks = async (renarratedBlocks) => {
  // Iterate through each block
  for (const block of renarratedBlocks) {
    const { body } = block;
    const { value } = body;

    // Process HTML string
    const modifiedHtmlString = await processHtmlString(value);

    // Update block body with modified HTML string
    body.value = modifiedHtmlString;
  }

  // Return modified renarrated blocks
  return renarratedBlocks;
};

export default processRenarratedBlocks;

