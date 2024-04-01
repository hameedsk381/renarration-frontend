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

} from '@mui/material';
import {  Share, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { getAllRenarrations } from '../apis/extractApis';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/actions/modalActions';
import ShareRenarration from './Share';

const fetchRenarrations = async () => {
  const response = await axios.get(getAllRenarrations);
  // console.log(response.data);
  return response.data;
};

function RenarrationDataGrid() {
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
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Alert severity="error">
          Error loading renarrations:
          {' '}
          {error.message}
        </Alert>
      </Container>
    );
  }

  if (!renarrations || renarrations.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Alert severity="info">No renarrations available.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4,mb:8 }}>

      <Typography fontWeight={'semibold'} sx={{ color: '#0069D2', mx: 2 ,fontSize:28}}>Latest Re-narrations</Typography>
      {/* <Stack my={3} direction={'row'} justifyContent={'space-between'}>
      </Stack> */}
      <TableContainer>
        <Table  aria-label="responsive renarration table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize:'1rem',fontWeight:'bold'}}>Renarration Title</TableCell>
              <TableCell sx={{fontSize:'1rem',fontWeight:'bold'}} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renarrations.map((renarration, index) => (
              <TableRow key={renarration._id} sx={{ height: '62px' }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontSize: 'calc(12px + 0.5vw)',
                    whiteSpace: 'nowrap',
                    maxWidth: '100px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {renarration.renarrationTitle}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Button
                 
                    startIcon={<Visibility />}
                    variant="outlined"
                    color='success'
                    onClick={() => navigate(`/renarration-details/${renarration._id}`)}
                    size="small"
                    sx={{ fontSize: { xs: 12, md: 14 },mr:2 }}
                  >
                    View
                  </Button>
                  <Button
                    startIcon={<Share />}
                    variant="outlined"
                    onClick={() => dispatch(openModal(<ShareRenarration id={`renarration-details/${renarration._id}`}/>))}
                    size="small"
                    sx={{ fontSize: { xs: 12, md: 14 } }}
                  >
                    share
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default RenarrationDataGrid;
