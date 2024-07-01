import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Alert,
  Container,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Stack,
  Box,

} from '@mui/material';
import {  Share, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { getAllSweets } from '../apis/extractApis';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/actions/modalActions';
import ShareRenarration from './Share';
import SweetInfo from './SweetInfo';
import SweetsTable from './SweetsTable';

const fetchRenarrations = async () => {
  const response = await axios.get(getAllSweets);
  // console.log(response.data);
  return response.data;
};

function SweetsDataGrid() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    data: renarrations,
    isLoading,
    isError,
    error,
  } = useQuery('renarrations', fetchRenarrations);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* Adjust the number and sizes of skeletons based on your table layout */}
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <SweetInfo/>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {error.code === 'ERR_NETWORK' ? <Alert severity='error'>please check your internet connection and try again</Alert>: <Alert severity="error">
          Error loading renarrations:
          {' '}
          {error.message}
        </Alert> }
        
      </Container>
    );
  }

  if (!renarrations || renarrations.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Alert severity="info">No sweets available.</Alert>
        <SweetInfo/>
      </Container>
    );
  }

  return (
    <Box  sx={{ my: 4,mb:8,width:"100%" }}>

      <Typography fontWeight={'semibold'} sx={{ color: '#0069D2', mx: 2 ,fontSize:28}}>Latest sweets</Typography>
      {/* <Stack my={3} direction={'row'} justifyContent={'space-between'}>
      </Stack> */}
     <SweetsTable renarrations={renarrations}/>
      <SweetInfo/>
    </Box>
  );
}

export default SweetsDataGrid;
