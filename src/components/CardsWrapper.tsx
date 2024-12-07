import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchSkins } from '../store/action-creators/skins';
import { RootState } from '../store/store';
import ProductCard from './ProductCard';
import { AppDispatch } from '../store/store';

interface CardsWrapperProps {
  query: string;
}

const CardsWrapper: React.FC<CardsWrapperProps> = ({ query }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { skins, loading, error } = useSelector((state: RootState) => state.skins);

  useEffect(() => {
    dispatch(fetchSkins(21));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredData = skins.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {filteredData.map((el, index) => (
          <Grid item key={index} xs={12} sm={6} md={2}>
            <ProductCard
              name={el.name}
              image={el.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardsWrapper;