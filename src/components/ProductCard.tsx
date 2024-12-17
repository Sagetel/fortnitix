import React, { useState } from "react";
import { Card, CardMedia, IconButton, Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { createFavorites } from "../store/action-creators/favorites";
import { useAppDispatch } from "../store/hooks";
import { Link } from "react-router-dom";
import { ShopItem } from "../utils/types";

interface ProductCardProps {
  image: string;
  name: string;
  mainId: string;
  product: ShopItem
}


const ProductCard: React.FC<ProductCardProps> = ({ image = defaultImage, name, mainId, product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const userIsLogedIn = useSelector(
    (state: RootState) => state.user.userIsLogedIn
  );
  const userUId = useSelector((state: RootState) => state.user.userUId);

  const handleClick = () => {
    setIsFavorite((prev) => !prev);
    dispatch(createFavorites({ mainId, userUId, product }));
  };

  return (
    <Card
      sx={{
        transition: "all .3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "121px",
        position: "relative",
        ":hover": {
          boxShadow: 5,
          transform: "scale(1.01)",
          "& .icon-button": {
            opacity: 1,
          },
          "& .details-box": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          alt={name}
          image={image}
          sx={{
            position: "relative",
            zIndex: 1,
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
            zIndex: 2,
            color: isFavorite ? "red" : "gray",
            opacity: isFavorite || isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          className="icon-button"
        >
          <FavoriteIcon />
        </IconButton>
        <Box
          className="details-box"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            textAlign: "center",
            zIndex: 2,
            opacity: 0,
            transform: "translateY(100%)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <Typography variant="body2">
            <Link
              to={`/skin/${mainId}`}
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Подробнее
            </Link>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
