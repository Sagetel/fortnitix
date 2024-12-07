import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  background: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, background, name, price }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const userIsLogedIn = useSelector((state: RootState) => state.user.userIsLogedIn);

  const handleClick = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <Card
      sx={{
        transition: 'all .3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ':hover': {
          boxShadow: 5,
          transform: 'scale(1.01)',
          '& .icon-button': {
            opacity: 1,
          },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        <IconButton 
          aria-label="add to favorites" 
          onClick={handleClick}
          sx={{
            display: userIsLogedIn ? 'block' : 'none',
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 3,
            color: isFavorite ? 'red' : 'gray',
            opacity: isFavorite || isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          className="icon-button"
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
        <Typography variant="body1" component="div" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
