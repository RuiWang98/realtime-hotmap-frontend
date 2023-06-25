import React, { useEffect, useState } from 'react';
import { Slider, IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

const RealtimeSlider = () => {
  const [value, setValue] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (isPlaying) {
      timer = setInterval(() => {
        setValue((currentValue) => currentValue + 1);
      }, 1000);
    } else if (!isPlaying) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying]);

  const formatDate = (value: number) => {
    const date = new Date();
    date.setDate(date.getDate() + value); // Add value to current date
    return date.toDateString();
  }

  return (
    <div className="flex items-center space-x-4">
      <IconButton onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>

      <Slider
        min={0}
        max={100}
        value={value}
        onChange={(_, newValue) => setValue(newValue as number)}
      />
      <span>{formatDate(value)}</span>
    </div>
  );
};

export default RealtimeSlider;