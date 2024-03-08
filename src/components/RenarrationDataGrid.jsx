import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button, Container, Skeleton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { getAllRenarrations } from '../apis/extractApis';
import EditRenarration from './EditRenarration';
import { ViewAgenda } from '@mui/icons-material';

const fetchRenarrations = async () => {
  const response = await axios.get(getAllRenarrations);
  // console.log(response.data);
  return response.data;
};

function RenarrationDataGrid() {
  const navigate = useNavigate();
  const {
    data: renarrations, isLoading, isError, error,
  } = useQuery('renarrations', fetchRenarrations);

  const columns = [
    { field: 'renarrationTitle', headerName: 'Renarration Title', flex: 0.4 }, // First column size is big
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.3,// Second column size is small
      sortable: false,
      renderCell: (params) => (
        <Stack gap={3} direction={'row'} sx={{ justifyContent: 'space-between' }}>
          <Button
            startIcon={<ViewAgenda/>}
            variant="contained"
            color="primary"
            onClick={() => navigate(`/renarration-details/${params.row._id}`, { state: params.row._id })}
          >
            View
          </Button>
         
        </Stack>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 0.3,// Second column size is small
      sortable: false,
      renderCell: (params) => (
        <Stack gap={3} direction={'row'} sx={{ justifyContent: 'space-between' }}>
         
          <EditRenarration/>
        </Stack>
      ),
    }
  ];

  const rows = renarrations?.map((renarration, index) => ({
    id: index,
    renarrationTitle: renarration.renarrationTitle,
    _id: renarration._id, // Assuming _id is unique for each renarration
  })) || [];

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Skeleton animation="wave" width="100" />
        <Skeleton animation="wave" width="100" />
        <Skeleton animation="wave" width="100" />
        <Skeleton animation="wave" width="100" />
        <Skeleton animation="wave" width="100" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <p>
          Error loading renarrations:
          {error.message}
        </p>
      </Container>
    );
  }

  if (rows.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 3 }}>
        No sweets available.
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </Container>
  );
}

export default RenarrationDataGrid;
