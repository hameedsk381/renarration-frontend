import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';


const RenarrationDataGrid = () => {
  const [renarrations,setRenarrations] = useState([]);
const getRennarations = async()=>{
 try {
    await axios.get('https://renarration-api.onrender.com/renarrations').then((res)=>{setRenarrations(res.data);console.log(res.data)})
 } catch (error) {
    console.log(error)
 }
}
useEffect(()=>{
getRennarations()
},[])
    const navigate = useNavigate();
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

    const rows = renarrations.map((renarration, index) => ({
        id: index,
        renarrationTitle: renarration.renarrationTitle,
        _id: renarration._id // Assuming _id is unique for each renarration
    }));
    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error: {error.message}</div>;
    return (
        <Container maxWidth='lg' sx={{my:3}}>
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
