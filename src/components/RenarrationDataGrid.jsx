

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
  Stack,
  Typography,
  TextField,
  Input
} from '@mui/material';
import { ViewAgenda, Visibility } from '@mui/icons-material';
import { getAllRenarrations } from '../apis/extractApis';
import axios from 'axios';

const fetchRenarrations = async () => {
  const response = await axios.get(getAllRenarrations);
  // console.log(response.data);
  return response.data;
};

function RenarrationDataGrid() {
  const navigate = useNavigate();
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
          Error loading renarrations: {error.message}
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
    <Container  sx={{ my:2 }}>
      {/* <Stack my={3} direction={'row'} justifyContent={'space-between'}>
        <Typography variant='h5'>Latest Re-narrations</Typography>
        <TextField size='small' label="Search Renarrations" />
      </Stack> */}
      <TableContainer component={Paper} variant='outlined'>
        <Table aria-label="responsive renarration table">
          <TableHead>
            <TableRow>
              <TableCell >Renarration Title</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {renarrations.map((renarration) => (
    <TableRow
      key={renarration._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell 
        component="th" 
        scope="row" 
        sx={{ 
          fontSize: 'calc(12px + 0.5vw)',
          whiteSpace: 'nowrap' ,
          maxWidth:'100px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {renarration.renarrationTitle}
      </TableCell>
      <TableCell 
        align="right"
        sx={{
          whiteSpace: 'nowrap' // Apply this if you want the content to dictate size without wrapping
        }}
      >
        <Button
          sx={{mr:3}}
          startIcon={<Visibility />}
          variant="contained"
          onClick={() => navigate(`/renarration-details/${renarration._id}`)}
          size='small'
        >
          View
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

