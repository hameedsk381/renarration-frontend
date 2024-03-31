import { useMutation } from 'react-query';
import axios from 'axios';

const Apicall = () => {
  return useMutation(async (requestData) => {
    const { data } = await axios.post('/your-api-endpoint', requestData);
    return data;
  });
};

export default Apicall;
