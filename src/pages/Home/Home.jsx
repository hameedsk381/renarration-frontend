import React from 'react';

import Hero from '../../components/Hero/Hero';
import UrlInput from '../../components/UrlInput/UrlInput';
import Navbar from '../../components/Navbar/Navbar';
import RenarrationDataGrid from '../../components/RenarrationDataGrid';
import Info from '../../components/Info';
import Footer from '../../components/Footer/Footer';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

function Home() {
  return (
    <>
      <Navbar />
      <Box>
    
       
       <Hero />
        <UrlInput homepage navigateTo="/re-narrate" />
      
        <RenarrationDataGrid />
        <Info />
      </Box>
     <Footer/>
    </>

  );
}

export default Home;
