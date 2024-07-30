import React, { useState, useEffect } from 'react';
import { TextField, Button, Tabs, Tab, Card, CardContent, Typography, Container, Grid } from '@mui/material';

const SearchResultPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [tab, setTab] = useState('all');

  const handleSearch = async (searchQuery, searchType) => {
    let endpoint = '';
    switch (searchType) {
      case 'all':
        endpoint = `/api/search/all?q=${searchQuery}`;
        break;
      case 'photo':
        endpoint = `/api/search/photos?q=${searchQuery}`;
        break;
      case 'video':
        endpoint = `/api/search/videos?q=${searchQuery}`;
        break;
      default:
        endpoint = `/api/search/all?q=${searchQuery}`;
    }

    const response = await fetch(endpoint);
    const data = await response.json();
    setResults(data.results);
  };

  useEffect(() => {
    if (query) {
      handleSearch(query, tab);
    }
  }, [query, tab]);

  return (
    <Container>
      <SearchBar setQuery={setQuery} />
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="All" value="all" />
        <Tab label="Photos" value="photo" />
        <Tab label="Videos" value="video" />
      </Tabs>
      <SearchResults results={results} tab={tab} />
    </Container>
  );
};

const SearchBar = ({ setQuery }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <TextField 
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
        style={{ width: '300px' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
        Search
      </Button>
    </form>
  );
};

const SearchResults = ({ results, tab }) => {
  if (tab === 'photo' || tab === 'video') {
    return (
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {results.map((result, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {tab === 'photo' ? (
              <img src={result.url} alt={result.title} style={{ width: '100%' }} />
            ) : (
              <video controls style={{ width: '100%' }}>
                <source src={result.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {results.map((result, index) => (
        <Card key={index} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">{result.title}</Typography>
            <Typography variant="body2" color="textSecondary">{result.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResultPage;
