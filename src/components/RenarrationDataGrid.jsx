

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
  Stack
} from '@mui/material';
import { ViewAgenda } from '@mui/icons-material';
import EditRenarration from './EditRenarration';
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
        <Skeleton animation="wave" height={60} />
        <Skeleton animation="wave" height={60} />
        <Skeleton animation="wave" height={60} />
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
    <Container maxWidth="lg" sx={{ my: { xs: 8, sm: 10, md: 14 } }}>
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
                <TableCell component="th" scope="row">
                  {renarration.renarrationTitle}
                </TableCell>
                <TableCell align="right">
                  <Button sx={{mr:3}}
                    startIcon={<ViewAgenda />}
                    variant="contained"
                    onClick={() => navigate(`/renarration-details/${renarration._id}`)}
                    size='small'
                  >
                    View
                  </Button>
                  <EditRenarration renarrationId={renarration._id} />
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

