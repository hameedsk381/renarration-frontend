import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Chip, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: "transparent",
  color: theme.palette.common.black,
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  fontSize: 'calc(12px + 0.5vw)',
}));

const StyledTableRow = styled(TableRow)(({ theme, index }) => ({
  backgroundColor: index % 2 ? theme.palette.action.hover : 'inherit',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function BasicTable({ columns, data , isPending  }) {
  return (
    <TableContainer component={Container}  >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index} sx={{ fontSize: 'calc(12px + 1vw)'}}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isPending ? <Skeleton variant="rectangular" width="100%" height={118} animation="wave" />: data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex} index={rowIndex} sx={{ fontSize: 'calc(12px + 0.5vw)' }}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex}> {column === 'Number of Sweets' ? 
                <Chip label={row[column]} /> : 
                row[column]}</TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
