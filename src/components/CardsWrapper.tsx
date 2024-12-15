import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { SkinState } from "../utils/types";

interface CardsWrapperProps extends SkinState {
  query: string;
}

const CardsWrapper: React.FC<CardsWrapperProps> = ({ query, shop, loading, error }) => {
  const [visibleGoods, setVisibleGoods] = useState<number>(24);

  const loadMoreRef = useInfiniteScroll(() => {
    setVisibleGoods((prev) => Math.min(prev + 6, shop.length));
  }, loading);

  const filteredData = shop
    .slice(0, visibleGoods)
    .filter((item) =>
      item.displayName.toLowerCase().includes(query.toLowerCase())
    );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Box>
      <Grid container spacing={3}>
        {filteredData.map(
          (el, index) =>
            el.displayAssets[0].full_background && (
              <Grid item key={`${el.mainId} ${index}`} xs={12} sm={6} md={2}>
                <ProductCard
                  name={el.displayName}
                  image={el.displayAssets[0].full_background}
                  mainId={el.mainId}
                />
              </Grid>
            )
        )}
      </Grid>
      {loading && <p>Loading more...</p>}
      <div ref={loadMoreRef} style={{ height: "20px" }} />
    </Box>
  );
};

export default CardsWrapper;
