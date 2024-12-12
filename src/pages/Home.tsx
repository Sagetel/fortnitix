import React, { useState, useEffect, useCallback } from "react";
import CardsWrapper from "../components/CardsWrapper";
import Search from "../components/Search";
import { Box } from "@mui/material";
import { AppDispatch, RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites } from "../store/action-creators/favorites";
const Home: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };
  const { userUId } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const dispatchFavorites = useCallback(() => {
    if (userUId) {
      dispatch(getFavorites());
    }
  }, [userUId, dispatch]);
  useEffect(() => {
    dispatchFavorites();
  }, [userUId, dispatchFavorites]);

  return (
    <div>
      <Box>
        <Search onSearch={handleSearch} />
        <CardsWrapper query={query} />
      </Box>
    </div>
  );
};

export default Home;
