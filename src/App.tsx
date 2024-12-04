import React from 'react';
import Header from './components/Header';
import CardsWrapper from './components/CardsWrapper';
import Search from './components/Search';

import './App.css';

import { Box } from '@mui/material';

function App() {
  return (
    <div>
      <Header />
      <Box sx={{ p: 10 }}>
        <Search />
        <CardsWrapper />
      </Box>
    </div>
  );
}

export default App;
