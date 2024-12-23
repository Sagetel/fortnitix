import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FilterSelect from './FilterSelect';
import { Grid } from '@mui/material';
import { setFilter } from '../../store/action-creators/filter';
import { ShopItem, FilterConfig } from '../../utils/types';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';

interface FiltersProps {
  shop: ShopItem[];
}

const Filters: React.FC<FiltersProps> = ({ shop }) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useSelector((state: RootState) => state.filter.selectedValues);
  const [filters, setFilters] = React.useState<FilterConfig[]>([]);

  useEffect(() => {
    const newFilters: FilterConfig[] = [
      { label: 'Тип предмета', key: 'mainType', uniqueValues: [] },
      { label: 'Раритет', key: 'rarity', uniqueValues: [] },
      { label: 'Доступность для покупки', key: 'buyAllowed', uniqueValues: [] },
    ];

    const mainTypes = new Set<string>();
    const rarities = new Set<string>();
    const buyAllowedOptions = new Set<string>(['да', 'нет']);

    shop.forEach(item => {
      if (item.mainType) {
        mainTypes.add(item.mainType.toLowerCase());
      }
      if (item.rarity && item.rarity.name) {
        rarities.add(item.rarity.name.toLowerCase());
      }
      buyAllowedOptions.add(item.buyAllowed ? 'да' : 'нет');
    });

    newFilters[0].uniqueValues = Array.from(mainTypes).sort();
    newFilters[1].uniqueValues = Array.from(rarities).sort();
    newFilters[2].uniqueValues = Array.from(buyAllowedOptions);

    setFilters(newFilters);
  }, [shop, selectedFilters]);

  const handleSelectChange = (key: string, value: string) => {
    dispatch(setFilter(key, value));
  };

  return (
    <Grid container spacing={3}>
      {filters.map(filter => (
        <Grid item xs={12} sm={6} md={2} key={filter.key}>
          <FilterSelect
            options={filter.uniqueValues}
            label={filter.label}
            onSelect={(value) => handleSelectChange(filter.key, value)}
            value={selectedFilters[filter.key] || ''} 
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Filters;
