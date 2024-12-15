import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

type FilterSelectProps = {
  options: string[];
  label: string;
  onSelect: (value: string) => void;
};

const FilterSelect: React.FC<FilterSelectProps> = ({ options, label, onSelect }) => {
  const [option, setOption] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setOption(selectedValue);
    onSelect(selectedValue);
  };

  const typesMap: Record<string, string> = {
    backpack: 'Рюкзаки',
    bundle: 'Наборы',
    emote: 'Эмоции',
    glider: 'Планеры',
    outfit: 'Скины',
    pickaxe: 'Кирки',
    shoes: 'Обувь',
    sparks_bass: 'Басс гитары',
    sparks_guitar: 'Обычные гитары',
    sparks_keyboard: 'Клавишные гитары',
    sparks_song: 'Треки',
    sparks_microphone: 'Треки',
    vehicle_booster: 'Эффекты ускорения',
    wrap: 'Обложки',
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          {options.map((optionValue, index) => (
            <MenuItem key={index} value={optionValue}>
              {typesMap[optionValue] || optionValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSelect;
