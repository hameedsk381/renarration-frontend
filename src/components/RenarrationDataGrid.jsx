import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { getAllRenarrations } from '../apis/extractApis';

const fetchRenarrations = async () => {
  const response = await axios.get(getAllRenarrations);
  return response.data;
};

const RenarrationDataGrid = () => {
  const navigate = useNavigate();
  const { data: renarrations, isLoading, isError, error } = useQuery('renarrations', fetchRenarrations);

  const columns = [
    { field: 'renarrationTitle', headerName: 'Renarration Title', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/renarration-details', { state: params.row._id })}
        >
          View
        </Button>
      ),
    },
  ];

  const rows = renarrations?.map((renarration, index) => ({
    id: index,
    renarrationTitle: renarration.renarrationTitle,
    _id: renarration._id // Assuming _id is unique for each renarration
  })) || [];

  if (isLoading) {
    return (
      <Container maxWidth='lg' sx={{ my: 3 }}>
       <Skeleton animation="wave" width={'100'} />
       <Skeleton animation="wave" width={'100'} />
       <Skeleton animation="wave" width={'100'} />
       <Skeleton animation="wave" width={'100'} />
       <Skeleton animation="wave" width={'100'} />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth='lg' sx={{ my: 3 }}>
        <p>Error loading renarrations: {error.message}</p>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ my: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </Container>
  );
};

export default RenarrationDataGrid;
