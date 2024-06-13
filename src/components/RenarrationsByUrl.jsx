import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography, Grid, Container, AppBar, Toolbar, Stack, Button, Badge, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import RenarrationBlock from './RenarrationBlock';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';
import { ArrowBack } from '@mui/icons-material';
import { getAllRenarrations } from '../apis/extractApis';

const RenarrationByUrl = () => {
  const { id: renarrationId } = useParams();
  const navigate = useNavigate();
  const [renarration, setRenarration] = useState([]);
  const [hoveredBlockId, setHoveredBlockId] = useState(null);

  const fetchRenarration = async () => {
    try {
      const response = await axios.get(`${getAllRenarrations}/${renarrationId}`);
      setRenarration(response.data.sweets);
      // console.log(response.data);
    } catch (error) {
      // console.error('Failed to fetch renarration:', error);
    }
  };

  useEffect(() => {
    fetchRenarration();
  }, []);

  const handleMouseEnter = (blockId) => {
    setHoveredBlockId(blockId);
  };

  const handleMouseLeave = () => {
    setHoveredBlockId(null);
  };

  const skeletons = Array.from({ length: 6 }, (_, index) => index);

  return renarration.length > 0 ? (
    <>
      <AppBar>
        <Toolbar>
          <Container sx={{ my: 2, justifyContent: 'space-between', flexDirection: 'row', display: 'flex' }}>
            <Stack>
              <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 24, md: 32 } }} color='white'>
                Re-narration
              </Typography>
            </Stack>
            <Button onClick={() => navigate('/')} color='inherit' sx={{ fontSize: { xs: 12, md: 14 } }}>
              Start a new re-narration
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Container sx={{ px: 4, my: 16 }} maxWidth='md'>
    
            {renarration.map((block, index) => (
              <Badge  anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }} color="secondary" badgeContent={block.renarrationTitle} key={index}>
                <Paper
                  elevation={6}
                  sx={{ my: 4, p: 3 }}
                  onMouseEnter={() => handleMouseEnter(block._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {block.annotations.map((annotation) => (
                    <RenarrationBlock
                      key={annotation._id}
                      block={annotation}
                      noTags
                      {...(hoveredBlockId !== block._id && { page: true })}
                    />
                  ))}
                </Paper>
              </Badge>
            ))}
            <Stack spacing={3} sx={{ mt: 4 }} />
          
       
      </Container>
    </>
  ) : (
    <Container>
      <Button startIcon={<ArrowBack />} sx={{ m: 4 }} onClick={() => navigate('/')} variant="contained">
        Go Back
      </Button>
      <Grid container spacing={2} p={3}>
        {skeletons.map((_, index) => (
          <Grid key={index} item xs={12}>
            <RenarrationBlockSkeleton key={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RenarrationByUrl;
