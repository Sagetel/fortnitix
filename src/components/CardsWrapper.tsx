import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
import Box from '@mui/material/Box';

interface Skin {
  name: string;
  price: string;
}

interface CardsWrapperProps {
  query: string;
}

const CardsWrapper: React.FC<CardsWrapperProps> = ({ query }) => {
  const fakeData: Skin[] = [
    { name: 'Galaxy Skin', price: '1200 V-Bucks' },
    { name: 'Mako Glider', price: '800 V-Bucks' },
    { name: 'Renegade Raider', price: '1200 V-Bucks' },
    { name: 'Aerial Assault Trooper', price: '1200 V-Bucks' },
    { name: 'Black Knight', price: '2000 V-Bucks' },
    { name: 'Sparkle Specialist', price: '1500 V-Bucks' },
    { name: 'Ice King', price: '2000 V-Bucks' },
    { name: 'Travis Scott Skin', price: '1500 V-Bucks' },
  ];

  const filteredData = fakeData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {filteredData.map((el, index) => (
          <Grid item key={index} xs={12} sm={6} md={2}>
            <ProductCard
              name={el.name}
              price={el.price}
              image="https://fortnite-api.com/images/cosmetics/br/cid_703_athena_commando_m_cyclone/icon.png"
              background="https://fortnite-api.com/images/cosmetics/series/creatorcollabseries.png"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardsWrapper;
