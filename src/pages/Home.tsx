import React, { useState, useEffect, useCallback } from "react";
import CardsWrapper from "../components/CardsWrapper";
import Search from "../components/Search";
import Filters from "../components/Filter/Filters";
import { Box, Button } from "@mui/material";
import { AppDispatch, RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites } from "../store/action-creators/favorites";
import { fetchShopAsync } from "../store/action-creators/skins";
import { resetFilters } from "../store/action-creators/filter";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const { userUId } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const { shop, loading, error } = useSelector(
    (state: RootState) => state.skins
  );

  const selectedFilters = useSelector((state: RootState) => state.filter.selectedValues);

  useEffect(() => {
    dispatch(fetchShopAsync());
  }, [dispatch]);

  const dispatchFavorites = useCallback(() => {
    if (userUId) {
      dispatch(getFavorites());
    }
  }, [userUId, dispatch]);

  useEffect(() => {
    dispatchFavorites();
  }, [userUId, dispatchFavorites]);

  const filteredShop = shop.filter(item => {
    const matchesMainType = selectedFilters.mainType ? item.mainType.toLowerCase() === selectedFilters.mainType.toLowerCase() : true;
    const matchesRarity = selectedFilters.rarity ? item.rarity.name.toLowerCase() === selectedFilters.rarity.toLowerCase() : true;
    const matchesBuyAllowed = selectedFilters.buyAllowed ? (item.buyAllowed ? 'да' : 'нет') === selectedFilters.buyAllowed : true;

    return matchesMainType && matchesRarity && matchesBuyAllowed;
  });

  const handleReset = () => {
    setQuery("");
    dispatch(resetFilters());
  };

  return (
    <div>
      <Search onSearch={handleSearch} query={query} />
      <Box display="flex" alignItems="center" mb={2}>
        <Filters shop={shop} />
        <Button 
          variant="contained" 
          onClick={handleReset}
          sx={{ marginLeft: 2, height: '100%' }}
        >
          Сбросить
        </Button>
      </Box>
      <CardsWrapper query={query} shop={filteredShop} loading={loading} error={error} />
    </div>
  );
};

export default Home;
