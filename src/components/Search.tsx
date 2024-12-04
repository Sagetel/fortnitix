import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const Search = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (debouncedQuery) {
      console.log('Search Query:', debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default Search;
