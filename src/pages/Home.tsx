import React, { useState, useEffect, useCallback } from "react";
import CardsWrapper from "../components/CardsWrapper";
import Search from "../components/Search";
import Filters from "../components/Filter/Filters";
import { Box, Button } from "@mui/material";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { getFavorites } from "../store/action-creators/favorites";
import { resetFilters } from "../store/action-creators/filter";
import { FiltersType, ShopItem } from "../utils/types";
import { useAppDispatch } from "../store/hooks";

interface SearchHistoryEntry {
  query: string;
  filters: FiltersType;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filteredShop, setFilteredShop] = useState<ShopItem[]>([]);

  const dispatch = useAppDispatch();
  const { userUId } = useSelector((state: RootState) => state.user);
  const { shop, loading, error } = useSelector((state: RootState) => state.skins);
  const selectedFilters = useSelector((state: RootState) => state.filter.selectedValues);

  const dispatchFavorites = useCallback(() => {
    if (userUId) {
      dispatch(getFavorites());
    }
  }, [userUId, dispatch]);

  useEffect(() => {
    dispatchFavorites();
  }, [userUId, dispatchFavorites]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim() !== "") {
      setQuery(searchQuery);
    }

    saveSearchHistory(searchQuery, selectedFilters);
  };

  const saveSearchHistory = (searchQuery: string, filters: FiltersType) => {
    const newEntry: SearchHistoryEntry = { query: searchQuery, filters };
    const savedHistory: SearchHistoryEntry[] = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const isDuplicate = savedHistory.some((entry: SearchHistoryEntry) => 
      entry.query === searchQuery && JSON.stringify(entry.filters) === JSON.stringify(filters)
    );

    if (!isDuplicate) {
      savedHistory.unshift(newEntry);

      if (savedHistory.length > 50) {
        savedHistory.pop();
      }

      localStorage.setItem('searchHistory', JSON.stringify(savedHistory));
    }
  };

  useEffect(() => {
    const filteredShop = shop.filter(item => {
      const matchesMainType = selectedFilters.mainType ? item.mainType.toLowerCase() === selectedFilters.mainType.toLowerCase() : true;
      const matchesRarity = selectedFilters.rarity ? item.rarity.name.toLowerCase() === selectedFilters.rarity.toLowerCase() : true;
      const matchesBuyAllowed = selectedFilters.buyAllowed ? (item.buyAllowed ? 'да' : 'нет') === selectedFilters.buyAllowed : true;
  
      return matchesMainType && matchesRarity && matchesBuyAllowed;
    });
    setFilteredShop(filteredShop);
  }, [selectedFilters.buyAllowed, selectedFilters.mainType, selectedFilters.rarity, shop]);

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
