import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container, AppBar, Toolbar, Stack, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RenarrationBlock from './RenarrationBlock';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';
import { ArrowBack } from '@mui/icons-material';
import { getAllRenarrations } from '../apis/extractApis';

const RenarrationByUrl = () => {
    const renarrationId = useParams().id;
const navigate = useNavigate();
  const [renarration, setRenarration] = useState(null);
  const fetchRenarration = async () => {
    try {
      const response = await axios.get(`${getAllRenarrations}/${renarrationId}` );
      setRenarration(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch renarration:', error);
    }
  };
  useEffect(() => {
 

    fetchRenarration();
  }, []);
  const skeletons = Array.from({ length: 6 }, (_, index) => index);
  return renarration ?  (

   <>
    <AppBar >
        <Toolbar>
        <Container sx={{my:2,justifyContent:'space-between' ,flexDirection:'row',display:'flex'}}  maxWidth='lg'>
          <Stack>
          <Typography sx={{fontWeight:'bold',fontSize:{xs:24, md:32}}} color={'white'}>
            Re-narration
         </Typography>
          </Stack>
          <Button  onClick={() => { navigate('/'); }} color='inherit' sx={{fontSize:{xs:12, md:14}}}>start a new re-narration</Button>
          
        </Container>
        </Toolbar>
        
      </AppBar>
<Container sx={{px:4,my:10}} maxWidth='md' >



{renarration && renarration.annotations.map((block,index) => (
<RenarrationBlock block={block} key={block._id} view />
))}
 
</Container>
   </>
  ) : ( <Container>
    <Button startIcon={<ArrowBack />} sx={{ m: 4 }} onClick={() => { navigate('/'); }} variant="contained">Go Back</Button>
    <Grid container spacing={2} p={3}>

      {skeletons.map((_, index) => (
        <Grid key={index} item   xs={12}>
          <RenarrationBlockSkeleton key={index} />
        </Grid>
      ))}

    </Grid>

  </Container>)
}

export default RenarrationByUrl;
