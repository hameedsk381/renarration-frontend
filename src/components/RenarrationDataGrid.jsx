import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, CircularProgress, useMediaQuery, Box, Button, Chip, Skeleton, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, Share, Facebook, Twitter, WhatsApp, ContentCopy } from '@mui/icons-material';
import { getAllRenarrations } from '../apis/extractApis';
import RenarrationInfo from './RenarrationInfo';

function RenarrationDataGrid() {
  const [renarrationData, setRenarrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:960px)');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRenarrationData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(getAllRenarrations);
        setRenarrationData(response.data);
      } catch (error) {
        console.error('Failed to fetch renarration data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRenarrationData();
  }, []);

  const handleShare = (url) => {
    setShareUrl(url);
    if (navigator.share) {
      navigator.share({
        title: 'Re-narration',
        text: 'Check out this re-narration!',
        url,
      }).catch(console.error);
    } else {
      setDrawerOpen(true);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard');
      setDrawerOpen(false);
    }).catch(console.error);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const skeletons = Array.from({ length: 6 }, (_, index) => index);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {skeletons.map((_, index) => (
          <Skeleton key={index} animation="wave" height={30} />
        ))}
        <RenarrationInfo />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 3 }}>
      
          {renarrationData && renarrationData.length > 0 ? (
            <TableContainer >
              <Typography fontWeight="semibold" sx={{ color: '#0069D2', m: 2, fontSize: isSmallScreen ? 20 : isMediumScreen ? 24 : 28 }}>
                Latest Re-narrations
              </Typography>
              <Table aria-label="renarration table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: { xs: 'small', md: 'large' } }}>URL</TableCell>
                    <TableCell align="center" sx={{ fontSize: { xs: 'small', md: 'large' } }}>Renarration title</TableCell>
                    <TableCell sx={{ fontSize: { xs: 'small', md: 'large' } }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renarrationData.map((data) => (
                    <TableRow key={data._id} sx={{ height: isSmallScreen ? '48px' : '62px' }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: isSmallScreen ? '12px' : 'calc(10px + 0.5vw)',
                          whiteSpace: 'nowrap',
                          maxWidth: isSmallScreen ? '80px' : '120px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {data.renarrationUrl}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: isSmallScreen ? '12px' : 'calc(10px + 0.5vw)' }}>
                        <Typography>{data.renarrationTitle}</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <Stack direction={'row'} spacing={1} >
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={() => navigate(`/view-renarrations/${data._id}`)}
                            startIcon={<Visibility />}
                            size="small"
                            sx={{ fontSize: { xs: 10, md: 14 } }}
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            color="warning"
                            startIcon={<Share />}
                            onClick={() => handleShare(`${window.location.origin}/view-renarrations/${data._id}`)}
                            size="small"
                            sx={{ fontSize: { xs: 10, md: 14 } }}
                          >
                            Share
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity='info'>No Renarrations found</Alert>
          )}
          <RenarrationInfo />
     
      </Container>
      <Drawer anchor="bottom" open={drawerOpen} onClose={closeDrawer}>
        <List>
          <ListItemButton onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}>
            <ListItemIcon><Facebook color='success'/></ListItemIcon>
            <ListItemText primary="Share on Facebook" />
          </ListItemButton>
          <ListItemButton onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`, '_blank')}>
            <ListItemIcon><Twitter color='info' /></ListItemIcon>
            <ListItemText primary="Share on Twitter" />
          </ListItemButton>
          <ListItemButton onClick={() => window.open(`https://api.whatsapp.com/send?text=${shareUrl}`, '_blank')}>
            <ListItemIcon><WhatsApp color='success'/></ListItemIcon>
            <ListItemText primary="Share on WhatsApp" />
          </ListItemButton>
          <ListItemButton onClick={() => copyToClipboard(shareUrl)}>
            <ListItemIcon><ContentCopy /></ListItemIcon>
            <ListItemText primary="Copy link to clipboard" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}

export default RenarrationDataGrid;
