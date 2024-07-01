import { Share, Visibility } from '@mui/icons-material';
import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/actions/modalActions';
import ShareRenarration from './Share';

const SweetsTable = ({ renarrations }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <TableContainer>
      <Table aria-label="responsive renarration table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Sweet Title</TableCell>
            {!isSmallScreen && <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }} align="center">No. of Annotations</TableCell>}
            <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renarrations.map((renarration, index) => (
            <TableRow key={renarration._id} sx={{ height: '62px' }}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  whiteSpace: 'nowrap',
                  maxWidth: { xs: '80px', sm: '100px' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {renarration.renarrationTitle}
              </TableCell>
              {!isSmallScreen && (
                <TableCell align="center">
                  <Chip label={renarration.annotationsCount} />
                </TableCell>
              )}
              <TableCell
                align="center"
                sx={{
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <Button
                  startIcon={<Visibility />}
                  variant="outlined"
                  color="success"
                  onClick={() => navigate(`/sweet-details/${renarration._id}`)}
                  size="small"
                  sx={{ fontSize: { xs: 12, md: 14 } }}
                >
                  View
                </Button>
                <Button color='warning'
                  startIcon={<Share />}
                  variant="outlined"
                  onClick={() => dispatch(openModal(<ShareRenarration id={renarration._id} route={'renarration-details'} />))}
                  size="small"
                  sx={{ fontSize: { xs: 12, md: 14 } }}
                >
                  Share
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SweetsTable;
