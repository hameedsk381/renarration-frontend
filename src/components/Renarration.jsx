import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
 Box, Button, Card, CardContent, CardHeader,
  CardMedia,  Grid, Paper, Stack, Typography,
} from '@mui/material';
import {
  ArrowBack,  NearMe,
} from '@mui/icons-material';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import { getAllRenarrations} from '../apis/extractApis';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';
import EditRenarration from './EditRenarration';

function Renarration() {
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
        <Stack component={Paper} elevation={8} spacing={2} m={4}>

          {renarration.blocks.map((block) => (
            <Card key={block.target.id} variant="elevation" elevation={0}>
              <CardHeader
                action={
                  <Button variant="outlined" size="small" endIcon={<NearMe />} onClick={()=>{navigate(`/sweet/${block._id}`)}} >view orginal story</Button>
            }
                subheader={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              />
              <CardMedia>
                <Stack direction="row" spacing={1} justifyContent="center">
                  {extractMedia(block.target.value).map((src, index) => (
                    <img
                      key={index}
                      style={{
                        width: '50%', height: 'auto', objectFit: 'cover', padding: 0.5,
                      }}
                      src={src}
                      alt={`Renarration  ${index + 1}`}
                    />
                  ))}
                </Stack>
              </CardMedia>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: removeMedia(block.target.value) }} />
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2, my: 3,
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: block.body.value }} />
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

export default Renarration;
