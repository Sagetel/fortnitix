 import React, { useState } from 'react';
import CardsWrapper from '../components/CardsWrapper';
import Search from '../components/Search';
import { Box } from '@mui/material';

const Home: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };
  return (
    <div>
      <Box sx={{ p: 10 }}>
        <Search onSearch={handleSearch} />
        <CardsWrapper query={query} />
      </Box>
    </div>
  );
};

export default Home;
