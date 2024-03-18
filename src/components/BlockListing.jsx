import { NearMe } from '@mui/icons-material';
import {
  Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, Paper, Stack, Typography,
} from '@mui/material';
import React from 'react';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';

function BlockListing({ blocks }) {
  const renarratedBlocks = blocks;
  return (
    <Stack component={Paper} my={3} p={2} spacing={3}>
      {renarratedBlocks && renarratedBlocks.map((block) => (
        <Card key={block.id} variant="elevation" elevation={0}>
          <CardHeader
            action={
              <Button variant="outlined" size="small" endIcon={<NearMe />} href={block.source} target="_blank">source</Button>
          }
            subheader={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          />
          <CardMedia>
            <Stack direction="row" spacing={1} justifyContent="center">
              {extractMedia(block.content).map((src, index) => (
                <img
                  key={index}
                  style={{
                    width: '50%', height: 'auto', objectFit: 'cover', padding: 0.5,
                  }}
                  src={src}
                  alt={`Renarration image ${index + 1}`}
                />
              ))}
            </Stack>
          </CardMedia>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: removeMedia(block.content) }} />
            <Paper
              variant="outlined"
              sx={{
                p: 2, my: 3, bgcolor: '#1c1c1c', color: 'white',
              }}
            >
              {block.img && (
              <img
                src={block.img}
                alt="Renarration image"
                style={{
                  width: '50%', height: 'auto', objectFit: 'cover', padding: 0.5,
                }}
              />
              )}
              <Typography my={2} sx={{ color: 'white' }}>{block.desc}</Typography>
              {block.aud && (
              <audio controls src={block.aud} style={{ marginBlock: '20px' }} />
              )}
              {block.vid && (
              <video controls width="100%" src={block.vid} style={{ marginBlock: '20px' }} />
              )}
            </Paper>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default BlockListing;
