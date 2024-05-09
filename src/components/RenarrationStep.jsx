// AnnotationStep.js
import React from 'react';
import { Box, TextField, Typography, Button, Card, CardContent } from '@mui/material';

const RenarrationStep = ({ annotations, onAdd, searchQuery, onSearchChange }) => (
    <>
        <TextField
            variant="outlined"
            placeholder="Search Annotations..."
            fullWidth
            value={searchQuery}
            onChange={onSearchChange}
            sx={{ mb: 2, mx: 4 }}
        />
        <Typography color={'#1565c0'} ml={4} my={2}>
            Showing results for "{searchQuery}"
        </Typography>
        <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', px: 4, py: 2 }}>
            {annotations.map((annotation) => (
                <Card key={annotation._id} sx={{ display: 'inline-block', width: 300, marginRight: 2, verticalAlign: 'top' }}>
                    <CardContent>
                        <Typography variant='h5' textTransform={'capitalize'}>
                            {annotation.title}
                        </Typography>
                        <Typography my={3}>
                            {annotation.content.substring(0, 50)}
                        </Typography>
                        <Button variant="contained" onClick={() => onAdd(annotation)}>
                            Add to Page
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    </>
);
export default RenarrationStep;
