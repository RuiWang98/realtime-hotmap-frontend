import React, { useEffect, useRef, useState } from "react";
import {
  Slider,
  IconButton,
  Stack,
  ToggleButton,
  Card,
  Typography,
} from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { filterPointsByDate } from "../features/data/dataSlice";

export const getDaysSinceEpoch = (date?: Date) => {
  return date ? Math.floor(date.getTime() / (1000 * 60 * 60 * 24)) : undefined;
};

const RealtimeSlider = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [minDate, setMinDate] = useState<number>();
  const [maxDate, setMaxDate] = useState<number>();
  const [date, setDate] = useState<number>();
  const points = useAppSelector((state) => state.data.points);
  const allPoints = useAppSelector((state) => state.data.allPoints);
  const firstRender = useRef<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isPlaying && date !== undefined && maxDate !== undefined) {
      timer = setInterval(() => {
        setDate((currentDate) => {
          if (currentDate && currentDate < maxDate) {
            return currentDate + 1;
          } else {
            setIsPlaying(false);
            return currentDate;
          }
        });
      }, 1000);
    } else if (!isPlaying && timer) {
      clearInterval(timer);
      timer = null;
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPlaying, date, maxDate]);

  useEffect(() => {
    let dates = [
      ...new Set(allPoints.map((point) => point.pickup_datetime.value)),
    ];
    dates.sort();
    setMinDate(getDaysSinceEpoch(dates[0]));
    setMaxDate(getDaysSinceEpoch(dates[dates.length - 1]));
    if (minDate && firstRender.current) {
      setDate(getDaysSinceEpoch(dates[0]));
      firstRender.current = false;
    }
  }, [allPoints]);

  useEffect(() => {
    date && dispatch(filterPointsByDate(date.toString()));
  }, [dispatch, date]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setDate(newValue as number);
  };

  const getDateFromEpochDays = (days: number) => {
    return new Date(days * 24 * 60 * 60 * 1000);
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
          min={minDate}
          max={maxDate}
          step={1}
          value={date ? date : 0}
          onChange={handleChange}
          // valueLabelDisplay="auto"
        />
        <Typography width={120} color={"white"}>
          {date && getDateFromEpochDays(date)?.toISOString().split("T")[0]}
        </Typography>
      </Stack>
    </Card>
  );
};

export default RealtimeSlider;
