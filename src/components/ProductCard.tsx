import React, { useState } from "react";
import { Card, CardMedia, IconButton, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { createFavorites } from "../store/action-creators/favorites";
import { useAppDispatch } from "../store/hooks";

interface ProductCardProps {
  image: string;
  name: string;
  mainId: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, mainId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const userIsLogedIn = useSelector(
    (state: RootState) => state.user.userIsLogedIn
  );
  const userUId = useSelector((state: RootState) => state.user.userUId);

  const handleClick = () => {
    setIsFavorite((prev) => !prev);
    dispatch(createFavorites({ mainId, userUId }));
  };

  return (
    <Card
      sx={{
        transition: "all .3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        ":hover": {
          boxShadow: 5,
          transform: "scale(1.01)",
          "& .icon-button": {
            opacity: 1,
          },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />
        <CardMedia
          component="img"
          alt={name}
          image={image}
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        />
        <IconButton
          aria-label="add to favorites"
          onClick={handleClick}
          sx={{
            display: userIsLogedIn ? "block" : "none",
            position: "absolute",
            lineHeight: 1,
            fontSize: "1rem",
            top: 8,
            right: 8,
            zIndex: 3,
            color: isFavorite ? "red" : "gray",
            opacity: isFavorite || isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          className="icon-button"
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProductCard;
