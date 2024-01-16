import React from 'react'
import Hero from '../../components/Hero/Hero'
import Walkthrough from '../../components/Walkthrough/Walkthrough'
import UrlInput from '../../components/UrlInput/UrlInput'
import BasicTable from '../../components/TableComp/BasicTable'
import { Chip, Container, Stack, Typography } from '@mui/material'
import SearchBar from '../../components/SearchBar/SearchBar'


const Home = () => {
  const columns = ['Websites', 'Re-narration Titles', 'Number of Sweets'];

const data = [
  { Websites: 'https://en.wikipedia.org/', 'Re-narration Titles': 'Renarration by Ru', 'Number of Sweets': 2},
  { Websites: 'https://www.soultree.in/', 'Re-narration Titles': 'ಬಾಳೆಕಾಯಿ ಚಿಪ್ಸ್ ತಯಾರಿ', 'Number of Sweets': 3 },
  { Websites: 'https://blog.min.io/', 'Re-narration Titles': "Ram's Renarration", 'Number of Sweets': 12 },
  { Websites: 'https://www.soultree.in/', 'Re-narration Titles': 'The Ultimate Solution', 'Number of Sweets': 10 },
  { Websites: 'https://askubuntu.com/', 'Re-narration Titles': 'Trying to make ubuntu hotswitch between headless and icewm', 'Number of Sweets': 4 },
  { Websites: 'https://www.nycmesh.net/', 'Re-narration Titles': 'How to start DIY Community Owned Wireless(COW) Mesh network', 'Number of Sweets': 6 },
  { Websites: 'https://hasirudala.in/', 'Re-narration Titles': 'ಕಸ ವಿಲೇವಾರಿ - "ಹಸಿರು ದಳ" ', 'Number of Sweets': 9 },
  { Websites: 'https://www.prajavani.net/', 'Re-narration Titles': 'WASTE MANAGEMENT', 'Number of Sweets': 2 },
  { Websites: 'https://Janastu.org', 'Re-narration Titles': 'Janastu address update', 'Number of Sweets': 2 },
  { Websites: 'https://en.wikipedia.org/', 'Re-narration Titles': 'Renarration by Ru', 'Number of Sweets': 8 }
];

  return (
    <main >

      <Hero />
      <UrlInput />
      {/* <Walkthrough/> */}

      <Container maxWidth="lg" sx={{ fontSize: 'calc(9px + (24 - 12) * ((100vw - 400px) / (400 - 100)))',my:5 }}>
        <Stack direction={{ sm: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 2 }} justifyContent={'space-between'} my={3}>
          <Typography variant='h5' textAlign={{ xs: 'center', md: "left" }}>Latest Re-narrations</Typography>
          <SearchBar />
        </Stack>

        <BasicTable columns={columns} data={data} customStyles={{backgroundColor:"red",borderRadius:"10%"}} />
      </Container>
    </main>
  )
}

export default Home