import dotenv from 'dotenv';
dotenv.config();
export const serverApi = process.env.SERVER_URL
export const extractApi = `${serverApi}/download`;
export const submitApi = `${serverApi}/sweets/create-renarration`;
export const getAllRenarrations = `${serverApi}/sweets/renarrations`;
export const uploadFileApi = `${serverApi}/upload`;
