import React, { useState, useEffect, useTransition } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Button, Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Add } from '@mui/icons-material';
import { addAnnotatedBlock } from '../redux/actions/annotationActions';
import { useDispatch, useSelector } from 'react-redux';

const SweetSearch = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedItems, setSelectedItems] = useState([]);
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
const dispatch = useDispatch();
  useEffect(() => {
    if (inputValue.trim() !== '') {
      handleSearch();
    } else {
      startTransition(() => {
        setOptions([]);
      });
    }
    console.log(options)
  }, [inputValue]);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:2424/sweets/getBlockByTag', {
        tag: inputValue,
      });

      startTransition(() => {
        setOptions(response.data.map((block) => ({ ...block, selected: false }))); // Save whole block in options for displaying in list
      });
    } catch (error) {
      console.error('Error fetching options:', error);
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
  
    setSelectedItems([...selectedItems,selectedOption ]);
    dispatch(addAnnotatedBlock(selectedOption));
    console.log('Item added to selected items:', selectedOption);
    setOptions(updatedOptions);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TextField type='search'
        size="small"
        label="Search sweets"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        fullWidth
      />

      {isPending || loading ? (
        <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', padding: '8px' }}>
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : !loading && options.length > 0 ? (
      
          <Paper component={'ul'} style={{ listStyle: 'none', margin: 0,paddingInline:'5px' }}>
            {options.map((option, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography component={'li'}
                  style={{
                    padding: '8px',
                    borderBottom: index !== options.length - 1 ? '1px solid #e0e0e0' : 'none',
                  }}
                >
                  {option._id}
                </Typography>
                {annotatedBlocks.find(item => option._id === item._id) ? <CheckCircleIcon /> : <Button startIcon={<Add/>} onClick={() => handleAddToSelected(option._id)}>Add</Button>}
              </div>
            ))}
          </Paper>
      
      ) : !loading && options.length === 0 && inputValue.trim() !== '' ? (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            zIndex: 1,
            padding: '5px',
          }}
        >
          No results found
        </div>
      ) : null}
    </div>
  );
};
export default SweetSearch;
