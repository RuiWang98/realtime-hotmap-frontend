import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { act } from "react-dom/test-utils";
import { Point, Type } from "./Convert";
import { Convert } from "./Convert";


export interface dataState {
  points: Point[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}

const initialState: dataState = {
  points: [
    {
      "id": "1",
      "time": "2023-06-08T12:30:00Z",
      "density": 0.5,
      "lat": "40.7128",
      "long": "-74.0060",
      "type": Type.Pickup
    },
    {
      "id": "2",
      "time": "2023-06-08T13:00:00Z",
      "density": 0.7,
      "lat": "40.7589",
      "long": "-73.9851",
      "type": Type.Pickup
    },
    {
      "id": "3",
      "time": "2023-06-08T13:30:00Z",
      "density": 0.4,
      "lat": "40.7295",
      "long": "-73.9965",
      "type": Type.Pickup
    },
    {
      "id": "4",
      "time": "2023-06-08T14:00:00Z",
      "density": 0.9,
      "lat": "40.7484",
      "long": "-73.9857",
      "type": Type.Pickup
    },
    {
      "id": "5",
      "time": "2023-06-08T14:30:00Z",
      "density": 0.6,
      "lat": "40.7306",
      "long": "-73.9352",
      "type": Type.Pickup
    }
  ]
  ,
  status: "idle",
  error: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.points = action.payload;
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

export const { setPoints } = dataSlice.actions;

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { dispatch }) => {
    const ws = new WebSocket(
      "wss://realtime-hotmap-backend-dqij5lkaea-uc.a.run.app"
    );

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (e) => {
      const parsedData: Point[] = Convert.toPoint(JSON.parse(e.data));
      // console.log(parsedData);
      dispatch(setPoints(parsedData));
    };

    ws.onerror = (e) => {
      throw new Error("WebSocket error");
    };

    ws.onclose = (e) => {
      console.log("WebSocket connection closed");
    };
  }
);

export default dataSlice.reducer;
