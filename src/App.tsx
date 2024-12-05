import React, { useState } from 'react';
import Header from './components/Header';
import CardsWrapper from './components/CardsWrapper';
import Search from './components/Search';

import './App.css';

import { Box } from '@mui/material';

function App() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <Header />
      <Box sx={{ p: 10 }}>
        <Search onSearch={handleSearch} />
        <CardsWrapper query={query} />
      </Box>
    </div>
  );
}

export default App;
