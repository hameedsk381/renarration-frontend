import React, { useState } from 'react'
import Hero from '../../components/Hero/Hero'
import Walkthrough from '../../components/Walkthrough/Walkthrough'
import UrlInput from '../../components/UrlInput/UrlInput'
import BasicTable from '../../components/TableComp/BasicTable'
import { Alert, Chip, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
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
const [searchQuery, setSearchQuery] = useState('');
const [searchField, setSearchField] = useState('Websites'); // Default search field

// Handler for search input changes
const handleSearchChange = (event) => {
  setSearchQuery(event.target.value.toLowerCase());
};

// Handler for search field changes
const handleSearchFieldChange = (event) => {
  setSearchField(event.target.value);
};

// Filter data based on search query and search field
const filteredData = data.filter((row) => {
  const fieldData = row[searchField].toLowerCase();
  return fieldData.includes(searchQuery);
});

  return (
    <main >

      <Hero />
      <UrlInput />
      {/* <Walkthrough/> */}

      <Container maxWidth="lg" sx={{ fontSize: 'calc(9px + (24 - 12) * ((100vw - 400px) / (400 - 100)))',my:5,height:'100%' }}>
        <Stack direction={{ sm: 'column', md: 'row' }}
          spacing={2} justifyContent={'space-between'} my={3}>
          <Typography variant='h5' textAlign={{ xs: 'center', md: "left" }} my={1}>Latest Re-narrations</Typography>
          <Stack direction={{ sm: 'column', md: 'row' }} >
          <Stack direction={'row'} alignItems="center" spacing={2} mb={2}>
          <FormLabel component="legend" sx={{ mb: { xs: 1, sm: 0 } }}>Search By:</FormLabel>
          <RadioGroup
            row
            name="searchBy"
            value={searchField}
            onChange={handleSearchFieldChange}
          >
            <FormControlLabel value="Websites" control={<Radio />} label="URL" />
            <FormControlLabel value="Re-narration Titles" control={<Radio />} label="Title" />
          </RadioGroup>
        </Stack>
        <SearchBar change={handleSearchChange} />
          </Stack>
          
        </Stack>

        {filteredData.length > 0 ? (
          <BasicTable columns={columns} data={filteredData}  />
        ) : (
          <Alert severity="info" sx={{ width: '100%', mt: 2 }}>
            No search results found.
          </Alert>
        )}
      </Container>
    </main>
  )
}

export default Home