import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Skeleton,
  Grid,
} from '@mui/material';

const MyComponent = ({ items, isLoading }) => {
  const [selectedId, setSelectedId] = useState(null);
  const selectedItem = items.find(item => item.id === selectedId);

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.subtitle}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            key={selectedId}
            layoutId={selectedId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '50%' }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {selectedItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedItem.subtitle}
                </Typography>
                <Typography variant="body1">{selectedItem.description}</Typography>
                <Button onClick={() => setSelectedId(null)}>Close</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Grid>
  );
};

export default MyComponent;