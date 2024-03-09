
export const serverApi = import.meta.env.VITE_SERVER_API || process.env.SERVER_URL;
// export const serverApi = 'http://localhost:3000'
export const extractApi = `${serverApi}/download`;
export const submitApi = `${serverApi}/sweets/create-renarration`;
export const getAllRenarrations = `${serverApi}/sweets/renarrations`;
export const uploadFileApi = `${serverApi}/upload`;
export const sharingIdApi = `${serverApi}/sweets/verify-sharing`
export const sweetsbyurl = `${serverApi}/sweets/url`