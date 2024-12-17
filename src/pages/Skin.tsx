import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, CircularProgress, Button, Grid } from "@mui/material";
import { RootState } from "../store/store";
import { ShopItem } from "../utils/types";

const Skin: React.FC = () => {
  const { skinId } = useParams<{ skinId: string }>();
  const { shop, loading, error } = useSelector((state: RootState) => state.skins);
  const [skin, setSkin] = useState<ShopItem | undefined>();

  useEffect(() => {
    const foundSkin = shop.find((item) => item.mainId === skinId);
    setSkin(foundSkin);
  }, [shop, skinId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!skin) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Товар не найден</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
          <img
            src={skin.displayAssets[0]?.url || ""}
            alt={skin.displayName}
            style={{ maxWidth: "100%", borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {skin.displayName}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {skin.displayDescription || "Описание отсутствует."}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Тип: {skin.displayType}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Редкость: {skin.rarity?.name || "Не указана"}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Цена: {skin.price.finalPrice} V-баксов
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Дата первого релиза: {skin.firstReleaseDate}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => window.open("https://www.fortnite.com/item-shop?lang=ru", "_blank")}
          >
            Купить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Skin;
