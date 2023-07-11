import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { getDaysSinceEpoch } from "../../components/realtimeSlider";
import { Convert, Point } from "./Convert";

export interface dataState {
  allPoints: Point[];
  points: Point[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
  pickupGeoData: any;
  dropoffGeoData: any;
  isPickup: boolean;
  isRealTime: boolean;
}

const initialState: dataState = {
  allPoints: [],
  points: [],
  status: "idle",
  error: null,
  pickupGeoData: {},
  dropoffGeoData: {},
  isPickup: true,
  isRealTime: true,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.allPoints = action.payload;
    },
    setMapPoints: (state, action: PayloadAction<Point[]>) => {
      state.points = action.payload;
    },
    filterPointsByDate: (state, action: PayloadAction<string>) => {
      console.log(state.allPoints);
      state.points = state.allPoints.filter((p) =>
        state.isPickup
          ? getDaysSinceEpoch(p.pickup_datetime)?.toString() === action.payload
          : getDaysSinceEpoch(p.dropoff_datetime)?.toString() === action.payload
      );
    },
    filterPointsByTimeInterval: (state, action: PayloadAction<number>) => {
      const pickedTime = dayjs().add(-action.payload, "minute");
      // const pickedTime = new Date(Date.now()).getTime() - action.payload * 60
      // console.log(pickedTime.toDate().getTime());
      state.points = state.allPoints.filter((p) => {
        console.log(p.pickup_datetime.getTime(), pickedTime.toDate().getTime());
        return state.isPickup
          ? p.pickup_datetime.getTime() >= pickedTime.toDate().getTime()
          : p.dropoff_datetime.getTime() >= pickedTime.toDate().getTime();
      });
      // state.points = state.allPoints;
    },
    setPickupGeoData: (state, action: PayloadAction<any>) => {
      state.pickupGeoData = action.payload;
    },
    setDropoffGeoData: (state, action: PayloadAction<any>) => {
      state.dropoffGeoData = action.payload;
    },
    setIsPickup: (state, action: PayloadAction<boolean>) => {
      state.isPickup = action.payload;
    },
    setIsRealTime: (state, action: PayloadAction<boolean>) => {
      state.isRealTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchHistoryData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchHistoryData.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchHistoryData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const {
  setPoints,
  setDropoffGeoData,
  setPickupGeoData,
  setIsPickup,
  filterPointsByDate,
  setIsRealTime,
  setMapPoints,
  filterPointsByTimeInterval,
} = dataSlice.actions;

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { dispatch }) => {
    const response = await fetch(
      "https://realtime-hotmap-backend-dqij5lkaea-uc.a.run.app/api/get"
      // "http://localhost:8080/api/get"
    );
    const data = await response.json();
    // console.log(data);
    const parsedData: Point[] = Convert.toPoint(data);
    // console.log(parsedData[0]);

    dispatch(setPoints(parsedData));
  }
);

export const fetchHistoryData = createAsyncThunk(
  "data/fetchHistoryData",
  async (date: Date, { dispatch }) => {
    const url =
      "https://realtime-hotmap-backend-dqij5lkaea-uc.a.run.app/api/getPast?timeStamp=" +
      date.getTime();
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const parsedData: Point[] = Convert.toPoint(data);
    // console.log(parsedData[0]);

    dispatch(setMapPoints(parsedData));
  }
);

export default dataSlice.reducer;
