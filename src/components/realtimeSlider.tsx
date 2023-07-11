import { Pause, PlayArrow } from "@mui/icons-material";
import { Card, Slider, Stack, ToggleButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  filterPointsByDate,
  filterPointsByTimeInterval,
} from "../features/data/dataSlice";
import dayjs from "dayjs";

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
  const isPickup = useAppSelector((state) => state.data.isPickup);
  const firstRender = useRef<boolean>(true);
  const [timeInterval, setTimeInterval] = useState<number>(20);
  const isRealTime = useAppSelector((state) => state.data.isRealTime);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   let timer: NodeJS.Timeout | null = null;

  //   if (isPlaying && date !== undefined && maxDate !== undefined) {
  //     timer = setInterval(() => {
  //       setDate((currentDate) => {
  //         if (currentDate && currentDate < maxDate) {
  //           return currentDate + 1;
  //         } else {
  //           setIsPlaying(false);
  //           return currentDate;
  //         }
  //       });
  //     }, 5000);
  //   } else if (!isPlaying && timer) {
  //     clearInterval(timer);
  //     timer = null;
  //   }

  //   return () => {
  //     if (timer) {
  //       clearInterval(timer);
  //     }
  //   };
  // }, [isPlaying, date, maxDate]);

  // useEffect(() => {
  //   let dates = [
  //     ...new Set(
  //       allPoints.map((point) =>
  //         isPickup ? point.pickup_datetime : point.dropoff_datetime
  //       )
  //     ),
  //   ];
  //   dates.sort((a, b) => a.getTime() - b.getTime());

  //   setMinDate(getDaysSinceEpoch(dates[0]));
  //   setMaxDate(getDaysSinceEpoch(dates[dates.length - 1]));
  //   console.log(minDate, maxDate);
  //   if (minDate && firstRender.current) {
  //     setDate(getDaysSinceEpoch(dates[0]));
  //     firstRender.current = false;
  //   }
  //   if (minDate && date && date < minDate) {
  //     setDate(getDaysSinceEpoch(dates[0]));
  //   }
  // }, [allPoints, isPickup]);

  useEffect(() => {
    // console.log(allPoints);
    if (isRealTime) {
      dispatch(filterPointsByTimeInterval(timeInterval));
    }
  }, [dispatch, allPoints, isRealTime, timeInterval]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    // setDate(newValue as number);
    setTimeInterval(newValue as number);
  };

  const getDateFromEpochDays = (days: number) => {
    return new Date(days * 24 * 60 * 60 * 1000);
  };

  const marks = [
    {
      value: 5,
      label: "5 mins",
    },
    {
      value: 10,
      label: "10 mins",
    },
    {
      value: 15,
      label: "15 mins",
    },
    {
      value: 20,
      label: "20 mins",
    },
  ];

  return (
    <Card variant="outlined" sx={{ background: "#616161", borderRadius: 6 }}>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"flex-start"}
        alignItems={"center"}
        width={700}
        height={50}
        px={3}
        sx={{ color: "white" }}
      >
        {/* <ToggleButton
          value="play"
          selected={isPlaying}
          onChange={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </ToggleButton> */}

        <Typography>
          Last {timeInterval < 10 ? `0${timeInterval}` : timeInterval} mins
          heatmap{" "}
        </Typography>
        <Stack direction={"row"} width={300} px={2}>
          <Slider
            aria-label="Show type"
            min={5}
            max={20}
            step={5}
            value={timeInterval}
            onChange={handleChange}
            defaultValue={20}
            marks={marks}
            getAriaValueText={(value) => `${value} min`}
            // valueLabelDisplay="auto"
          />
        </Stack>

        <Typography width={120} color={"white"}>
          Now Time : XXXX
        </Typography>
      </Stack>
    </Card>
  );
};

export default RealtimeSlider;
