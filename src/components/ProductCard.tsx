import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  background: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, background, name, price }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            zIndex: 1,
          }}
        />
        <CardMedia
          component="img"
          alt={name}
          image={image}
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        />
      </Box>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="body1" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
        </div>
        <IconButton aria-label="add to favorites" onClick={handleClick}>
          <FavoriteIcon sx={{ color: isFavorite ? 'red' : 'gray' }} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
