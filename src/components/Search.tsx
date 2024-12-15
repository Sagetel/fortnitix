import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  onSearch: (query: string) => void;
  query: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, query }) => {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [localQuery, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
  };

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={localQuery}
        onChange={handleChange}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default Search;
