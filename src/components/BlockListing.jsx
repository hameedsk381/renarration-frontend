import { NearMe } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import extractMedia from '../utils/extractMedia'
import removeMedia from '../utils/removeMedia'

const BlockListing = ({blocks}) => {
  return (
    <Grid container p={3} spacing={2}>
    {blocks && blocks.map((block) => (
      <Grid item key={block.id} xs={12} sm={6}>
        <Card>
          <CardHeader
            action={
                      <Button variant="outlined" size="small" endIcon={<NearMe />} href={block.source} target="_blank">source</Button>
}
            subheader={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                      {block.img && (
                      <Box
                         component="img"
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
      </Grid>
    ))}
  </Grid>
  )
}

export default BlockListing