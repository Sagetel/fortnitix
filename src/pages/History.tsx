import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Container, Button } from '@mui/material';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom'; 
import { FiltersType } from '../utils/types';

const History: React.FC = () => {
  const [localHistory, setLocalHistory] = useState<Array<{ query: string; filters: FiltersType }>>([]);
  const { userIsLogedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setLocalHistory(parsedHistory);
    }
  }, []);

  useEffect(() => {
    if (!userIsLogedIn) {
      navigate('/singin');
    }
  }, [userIsLogedIn, navigate]); 

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setLocalHistory([]);
  };

  if (!userIsLogedIn) {
    return null; 
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        История Поиска
      </Typography>
      <Button variant="contained" onClick={clearHistory}>
        Очистить Историю
      </Button>
      {localHistory.length === 0 ? (
        <Typography variant="body1">История поиска пуста.</Typography>
      ) : (
        <List>
          {localHistory.map((item, index) => (
            <ListItem 
              key={index} 
              divider 
              component="div"
            >
              <ListItemText
                primary={`Запрос: ${item.query}`}
                secondary={`Фильтры: ${JSON.stringify(item.filters)}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default History;
