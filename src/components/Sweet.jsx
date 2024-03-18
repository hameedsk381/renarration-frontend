import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Alert, Box, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Container, Grid, Paper, Stack, Typography,
} from '@mui/material';
import {
  ArrowBack, ArrowForward, Edit, NearMe,
} from '@mui/icons-material';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import { getAllRenarrations, sharingIdApi } from '../apis/extractApis';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';
import EditRenarration from './EditRenarration';

function Sweet() {
  const renarrationId = useParams().id;
  const [renarration, setRenarration] = useState(null);

  const navigate = useNavigate();

  const getRennaration = async () => {
    try {
      const res = await axios.get(`${getAllRenarrations}/${renarrationId}`);

      setRenarration({ ...res.data, blocks: res.data.blocks });
      // console.log(res.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getRennaration();
    // console.log(renarrationId)
  }, [renarrationId]);
  const skeletons = Array.from({ length: 6 }, (_, index) => index);
  return renarration
    ? (
      <Box>
        <Stack m={4} direction="row" justifyContent="space-between">
          <Button startIcon={<ArrowBack />} onClick={() => { navigate('/'); }} variant="contained">Go Back</Button>
          <EditRenarration renarrationId={renarration._id} />
        </Stack>
        <Typography textAlign="center" variant="h4">{renarration.renarrationTitle}</Typography>
        <Stack component={Paper} elevation={0} spacing={2} m={4}>

          {renarration.blocks.map((block, index) => (
            <Card key={index} elevation={0}>
              <CardHeader
                action={
                  <Button variant="outlined" size="small" endIcon={<NearMe />} href={block.source} target="_blank">source</Button>
                }
              />
              <CardMedia>
                <Box sx={{
                  display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 1,
                }}
                >
                  {extractMedia(block.content).map((src, index) => (
                    <Box
                      key={index}
                      component="img"
                      loading="lazy"
                      sx={{
                        width: '50%',
                        height: 'auto',
                        objectFit: 'cover',
                        p: 0.5,
                      }}
                      src={src}
                      alt={`Renarration image ${index + 1}`}
                    />
                  ))}

                </Box>
              </CardMedia>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: removeMedia(block.content) }} />
                <Paper variant="outlined" sx={{ p: 2, my: 3 }}>
                  <Typography>{block.description}</Typography>
                  {block.img && (
                    <Box
                      component="img"
                      loading="lazy"
                      src={(block.img)}
                      alt="Renarration image"
                      sx={{
                        width: '50%', height: 'auto', objectFit: 'cover', p: 0.5,
                      }}
                    />
                  )}
                  <Typography my={2}>{block.desc}</Typography>
                  {block.aud && (
                    <audio controls src={(block.aud)} style={{ marginBlock: '20px' }} />
                  )}
                  {block.vid && (
                    <video controls width="100%" src={(block.vid)} style={{ marginBlock: '20px' }} />
                  )}
                </Paper>
              </CardContent>

            </Card>
          ))}
        </Stack>

      </Box>
    )
    : (
      <>
        <Button startIcon={<ArrowBack />} sx={{ m: 4 }} onClick={() => { navigate('/'); }} variant="contained">Go Back</Button>
        <Grid container spacing={2} p={3}>

          {skeletons.map((_, index) => (
            <Grid key={index} item lg={3} md={4} xs={12}>
              <RenarrationBlockSkeleton key={index} />
            </Grid>
          ))}

        </Grid>

      </>
    );
}

export default Sweet;
