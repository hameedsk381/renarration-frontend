import React from 'react';

import Hero from '../../components/Hero/Hero';
import UrlInput from '../../components/UrlInput/UrlInput';
import Navbar from '../../components/Navbar/Navbar';
import RenarrationDataGrid from '../../components/RenarrationDataGrid';
import Footer from '../../components/Footer/Footer';
import { Box, Button, Chip, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import Compose from '../../components/Compose';
import HomeTabs from '../../components/HomeTabs';
import { useNavigate } from 'react-router-dom';

function Home() {
  
  return (
    <>
    <Container>
      <Navbar />

    
       
       <Hero />
     
      
    
    </Container>
 <Footer/>
    </>
  );
}

export default Home;
