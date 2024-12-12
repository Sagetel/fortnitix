import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShopAsync } from '../store/action-creators/skins';
import { RootState } from '../store/store';
import ProductCard from './ProductCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { AppDispatch } from '../store/store';

interface CardsWrapperProps {
  query: string;
}

const CardsWrapper: React.FC<CardsWrapperProps> = ({ query }) => {
    const [visibleGoods, setVisibleGoods] = useState<number>(24);

    const dispatch = useDispatch<AppDispatch>();
    const { shop, loading, error } = useSelector((state: RootState) => state.skins);

    useEffect(() => {
        dispatch(fetchShopAsync());
    }, [dispatch]);

    const loadMoreRef = useInfiniteScroll(() => {
        setVisibleGoods(prev => Math.min(prev + 6, shop.length));
    }, loading);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredData = shop.slice(0, visibleGoods).filter((item) =>
        item.displayName.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <Box>
      <Grid container spacing={3}>
          {filteredData.map((el, index) => (
                el.displayAssets[0].full_background &&
                <Grid item key={el.mainId} xs={12} sm={6} md={2}>
                    <ProductCard
                        name={el.displayName}
                        image={el.displayAssets[0].full_background}
                    />
                </Grid>
          ))}
      </Grid>
      {loading && <p>Loading more...</p>}
      <div ref={loadMoreRef} style={{ height: '20px' }} />
    </Box>
  );
};

export default CardsWrapper;
