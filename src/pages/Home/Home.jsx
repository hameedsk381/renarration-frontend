import React, { useEffect, useState, useTransition } from 'react';
import {
  Alert, Chip, Container, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Hero from '../../components/Hero/Hero';
import Walkthrough from '../../components/Walkthrough/Walkthrough';
import UrlInput from '../../components/UrlInput/UrlInput';
import BasicTable from '../../components/TableComp/BasicTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import RenarrationDataGrid from '../../components/RenarrationDataGrid';
import { serverApi } from '../../apis/extractApis';

function Home() {
 
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <UrlInput navigateTo="/re-narrate" />
        <RenarrationDataGrid />
      </main>
      <Footer />
    </>

  );
}

export default Home;
