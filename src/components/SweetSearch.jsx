import React, { useState, useEffect, useTransition } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Button, Paper, Typography, Drawer, Container, Stack, Grid, IconButton, InputAdornment, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Add, Close, Search } from '@mui/icons-material';
import { addAnnotatedBlock } from '../redux/actions/annotationActions';
import { useDispatch, useSelector } from 'react-redux';
import RenarrationBlock from './RenarrationBlock';
import removeMedia from '../utils/removeMedia';

const SweetSearch = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false); // State for controlling drawer
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const dispatch = useDispatch();

  useEffect(() => {
   if(inputValue === 0){
    setOptions([])
   } else {
    handleSearch()
   }
  }, [inputValue]);

  const handleSearch = async () => {
    
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:2424/sweets/getBlockByTag', {
        tag: inputValue,
      });

     
        setOptions(response.data.map((block) => ({ ...block, selected: false })));
    
    } catch (error) {
      console.error('Error fetching options:', error);
      setOptions([])
    } finally {
      setLoading(false);
      
    }
  };

  const handleAddToSelected = (id) => {
    const updatedOptions = options.map((option) =>
      option._id === id ? { ...option, selected: true } : option
    );
    const selectedOption = options.find((option) =>
      option._id === id
    );

    setSelectedItems([...selectedItems, selectedOption]);
    dispatch(addAnnotatedBlock(selectedOption));
    console.log('Item added to selected items:', selectedOption);
    setOptions(updatedOptions);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TextField 
        type='search'
        size="small"
        label="Search sweets"
        value={inputValue}
        sx={{display:openDrawer?'none':'flex'}}
        onChange={(event) => setInputValue(event.target.value)}
        fullWidth
         InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton onClick={()=>{
              handleSearch();setOpenDrawer(true);
            }}>
              <Search/></IconButton></InputAdornment>,
          }}
         onKeyPress={(event) => {
    if (event.key === 'Enter') {
      handleSearch();
      setOpenDrawer(true);
    }
    if (event.key === 'Backspace') {
               setInputValue(event.target.value.slice(0, -1));
             }
  }}
        
      />
      

      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          '.MuiDrawer-paper': {
           
            borderTopRightRadius: '20px',
            borderTopLeftRadius: '20px',
            height:'80dvh'
          },
        }}
      >
         
        < >
          <div style={{display:'flex',justifyContent:'end'}}>
            <IconButton onClick={() => setOpenDrawer(false)} sx={{m:2}}><Close/></IconButton>
          </div>
        <Stack sx={{ display: 'flex', justifyContent: 'center',mb:5,alignItems:'center'}}>
          <TextField 
            type='search'
            size="small"
            label="Search sweets"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            sx={{width:'250px'}}
             InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton onClick={()=>{
              handleSearch();setOpenDrawer(true);
            }}>
              <Search/></IconButton></InputAdornment>,
          }}
          
             onKeyPress={(event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
    if (event.key === 'Backspace') {
               setInputValue(event.target.value.slice(0, -1));
             }
  }}
            
          />
        </Stack>
   <Container spacing={2}>
      { loading ? (
       
          <CircularProgress color="inherit" size={20} />
      
      ) : !loading && options.length > 0 ? (
        <Grid container  spacing={3}>
          {options.map((option, index) => (
            <Grid item key={index} md={3} sx={{mx:3}}>
              <Paper variant='outlined' sx={{ px: 2,width:'230px' }}>
        <h1 style={{textTransform:'capitalize'}}>
          {option.body.title}
        </h1>
        <Stack dangerouslySetInnerHTML={{ __html: removeMedia(option.body.value) }} style={{width:'100%',height: '150px' ,overflow:'auto'}} />
                
                {annotatedBlocks.find(item => option._id === item._id) ? <CheckCircleIcon /> : <Button variant='contained' sx={{my:2}} startIcon={<Add />} onClick={() => handleAddToSelected(option._id)}>Add</Button>}
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : !loading && options.length === 0 && inputValue.trim() !== '' ? (
        
         <Alert severity='info'>No results found for {inputValue}</Alert>
      
      ) : null}
    </Container>
    { inputValue.trim() === '' && <Alert severity='info'>Please enter value</Alert>}
        </>
      </Drawer>
    </div>
  );
};

export default SweetSearch;

