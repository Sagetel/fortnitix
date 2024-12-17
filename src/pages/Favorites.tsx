import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetFilters } from "../store/action-creators/filter";
import { RootState } from "../store/store";
import CardsWrapper from "../components/CardsWrapper";
import Filters from "../components/Filter/Filters";
import Search from "../components/Search";
function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };
  useEffect(() => {
    if (!user.userUId) {
      navigate("/");
    }
  }, [user]);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const selectedFilters = useSelector(
    (state: RootState) => state.filter.selectedValues
  );
  const handleReset = () => {
    setQuery("");
    dispatch(resetFilters());
  };
  const filteredFavs = favorites.filter((item) => {
    const matchesMainType = selectedFilters.mainType
      ? item.mainType.toLowerCase() === selectedFilters.mainType.toLowerCase()
      : true;
    const matchesRarity = selectedFilters.rarity
      ? item.rarity.name.toLowerCase() === selectedFilters.rarity.toLowerCase()
      : true;
    const matchesBuyAllowed = selectedFilters.buyAllowed
      ? (item.buyAllowed ? "да" : "нет") === selectedFilters.buyAllowed
      : true;

    return matchesMainType && matchesRarity && matchesBuyAllowed;
  });

  return (
    <div>
      <Search onSearch={handleSearch} query={query} />
      <Box display="flex" alignItems="center" mb={2}>
        <Filters shop={favorites} />
        <Button
          variant="contained"
          onClick={handleReset}
          sx={{ marginLeft: 2, height: "100%" }}
        >
          Сбросить
        </Button>
      </Box>
      <CardsWrapper query={""} shop={filteredFavs} loading={false} error={""} />
    </div>
  );
}

export default Favorites;
