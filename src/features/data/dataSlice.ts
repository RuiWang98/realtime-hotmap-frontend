import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { act } from "react-dom/test-utils";
import { Point } from "./Convert";
import { Convert } from "./Convert";
import { AnyLayer } from "react-map-gl/dist/esm/types";
import { getDaysSinceEpoch } from "../../components/realtimeSlider";

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
    filterPointsByDate: (state, action: PayloadAction<string>) => {
      state.points = state.allPoints.filter((p) =>
        state.isPickup
          ? getDaysSinceEpoch(p.pickup_datetime)?.toString() === action.payload
          : getDaysSinceEpoch(p.dropoff_datetime)?.toString() === action.payload
      );
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
} = dataSlice.actions;

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { dispatch }) => {
    const response = await fetch(
      "https://realtime-hotmap-backend-dqij5lkaea-uc.a.run.app/api/get"
    );
    const data = await response.json();
    // console.log(data);
    const parsedData: Point[] = Convert.toPoint(data);
    // console.log(parsedData[0]);

    dispatch(setPoints(parsedData));
  }
);

export default dataSlice.reducer;
