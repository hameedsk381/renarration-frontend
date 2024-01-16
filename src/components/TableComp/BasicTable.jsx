import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: "transparent",
  color: theme.palette.common.black,
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
}));

const StyledTableRow = styled(TableRow)(({ theme, index }) => ({
  backgroundColor: index % 2 ? theme.palette.action.hover : 'inherit',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function BasicTable({ columns, data  }) {
  return (
    <TableContainer component={Container} sx={{height:"40vh"}} >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex} index={rowIndex}>
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
