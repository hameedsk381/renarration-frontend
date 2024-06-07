import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container,Typography, CircularProgress,useMediaQuery, Box, Button, Chip , Skeleton} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility } from '@mui/icons-material';
import { getAllRenarrations } from '../apis/extractApis';
import RenarrationInfo from './RenarrationInfo';


function RenarrationDataGrid() {
  const [renarrationData, setRenarrationData] = useState(null);
  const [loading,setLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:960px)');

  // Adjust typography and button size based on screen size
  const headingFontSize = isSmallScreen ? 20 : isMediumScreen ? 24 : 28;
  const cellFontSize = isSmallScreen ? '12px' : 'calc(10px + 0.5vw)';
  const buttonSize = isSmallScreen ? 'extra-small' : isMediumScreen ? 'small' : 'medium';
  const buttonPadding = isSmallScreen ? '4px 8px' : '8px 16px';
const navigate = useNavigate();
  useEffect(() => {
    const fetchRenarrationData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(getAllRenarrations);
        setRenarrationData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch renarration data:', error);
        setLoading(false);
      }
    };

    fetchRenarrationData();
  }, []);
 
  if (loading) {
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
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
      </Container>
    );
  }

  return renarrationData && (
    <Box sx={{ my: 4, mb: 8, width: '100%' }}>
      <TableContainer>
        <Typography
          fontWeight="semibold"
          sx={{ color: '#0069D2', m: 2, fontSize: headingFontSize }}
        >
          Latest Re-narrations
        </Typography>
        <Table aria-label="renarration table">
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell align="center">Number of sweets</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renarrationData.map((data) => (
               <TableRow key={data._id} sx={{ height: isSmallScreen ? '48px' : '62px' }}>
               <TableCell
                 component="th"
                 scope="row"
                 sx={{
                   fontSize: cellFontSize,
                   whiteSpace: 'nowrap',
                   maxWidth: isSmallScreen ? '80px' : '120px',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                 }}
               >
                 {data.renarrationUrl}
               </TableCell>
               <TableCell align="center" sx={{ fontSize: cellFontSize }}>
                 <Chip label={data.sweetcount} />
               </TableCell>
               <TableCell align="center" sx={{ fontSize: cellFontSize }}>
                 <Button
                   variant="contained"
                   color="primary"
                   onClick={() => navigate(`/view-renarrations/${data._id}`)}
                   startIcon={<Visibility />}
                   size="small" // Material-UI doesn't have an "extra-small" button size; instead, use a custom style.
                   sx={{ padding: buttonPadding }}
                 >
                   View
                 </Button>
               </TableCell>
             </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RenarrationInfo />
    </Box>
   
  );
}

export default RenarrationDataGrid;
