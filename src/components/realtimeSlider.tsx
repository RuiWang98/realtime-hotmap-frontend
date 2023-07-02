import React, { useEffect, useState } from "react";
import {
  Slider,
  IconButton,
  Stack,
  ToggleButton,
  Card,
  Typography,
} from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

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
  };

  return (
    <Card variant="outlined" sx={{ background: "#616161" }}>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"flex-start"}
        alignItems={"center"}
        width={800}
      >
        <ToggleButton
          value="play"
          selected={isPlaying}
          onChange={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </ToggleButton>

        <Slider
          min={0}
          max={100}
          value={value}
          onChange={(_, newValue) => setValue(newValue as number)}
        />
        <Typography color={"white"}>{formatDate(value)}</Typography>
      </Stack>
    </Card>
  );
};

export default RealtimeSlider;
