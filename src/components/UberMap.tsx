import { useEffect, useState } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchData,
  setDropoffGeoData,
  setIsRealTime,
  setPickupGeoData,
} from "../features/data/dataSlice";
import { circleLayer, heatmapLayer } from "../map-style";
import Control from "./Control";
import Dashboard from "./Dashboard";
import Header from "./Header";
import SearchBar from "./SearchBar";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmVuamE5OCIsImEiOiJjbGlpYzZuOHUxdHV6M2dwN2M5bXNsZTFrIn0.9aQuvhbH6EifAfRcMX-dug";

const UberMap = () => {
  const pickupData = useAppSelector((state) => state.data.pickupGeoData);
  const dropoffData = useAppSelector((state) => state.data.dropoffGeoData);
  const isPickup = useAppSelector((state) => state.data.isPickup);
  const dispatch = useAppDispatch();
  const points = useAppSelector((state) => state.data.points);
  const isRealTime = useAppSelector((state) => state.data.isRealTime);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(fetchData());
    }, 2000);
    console.log("Fetch Data");
    return () => clearInterval(id);
  }, [dispatch]);

  useEffect(() => {
    // console.log(points);
    const pdata = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84",
        },
      },
      features: points
        ? points.map((point, index) => ({
            type: "Feature",
            properties: {
              // type: point.type,
              license: point.Hvfhs_license_num,
              // time: point.time,
              density: point.density,
              // lat: point.lat,
              // lng: point.long,
            },
            geometry: {
              type: "Point",
              coordinates: [point.pickup_long, point.pickup_lat],
            },
          }))
        : [],
    };
    // console.log(data);
    dispatch(setPickupGeoData(pdata));

    const ddata = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84",
        },
      },
      features: points
        ? points.map((point, index) => ({
            type: "Feature",
            properties: {
              // type: point.type,
              license: point.Hvfhs_license_num,
              // time: point.time,
              density: point.density,
              // lat: point.lat,
              // lng: point.long,
            },
            geometry: {
              type: "Point",
              coordinates: [point.dropoff_long, point.dropoff_lat],
            },
          }))
        : [],
    };
    dispatch(setDropoffGeoData(ddata));
  }, [points, dispatch]);

  return (
    <div style={{ height: "100vh" }}>
      <div className="max-w-sm hover:max-w-lg">
        <Header />
        <SearchBar />
        <Dashboard />
        <Control />
        <SwitchButton />
        {!isRealTime && <HistoryDatePicker />}

        <MapGL
          initialViewState={{
            latitude: 40.71,
            longitude: -74,
            zoom: 12,
          }}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {(dropoffData || pickupData) && (
            <Source type="geojson" data={isPickup ? pickupData : dropoffData}>
              <Layer {...heatmapLayer} />
              <Layer {...circleLayer} />
            </Source>
          )}
        </MapGL>

        {/* todo */}
        {/* <RealtimeSlider />  */}
      </div>
    </div>
  );
};

const SwitchButton = () => {
  const dispatch = useAppDispatch();
  const isRealTime = useAppSelector((state) => state.data.isRealTime);

  return (
    <div className="w-full absolute z-10 top-[50px] justify-end flex mt-12 pr-40">
      <button
        className="h-8 pl-2 pr-4 bg-slate-900 text-slate-100 border-grey-500 bg-opacity-50 border-[1px] text-sm rounded-2xl hover:text-white transition duration-150 ease-in-out shadow hover: border-white hover:bg-opacity-100 hover:bg-slate-800 hover: ml-1 hover:translate-x-0.5 transition-transform duration-150 ease-in-out"
        onClick={() => dispatch(setIsRealTime(!isRealTime))}
      >
        {isRealTime ? "Switch To Historical data" : "Switch To Realtime data"}
      </button>
    </div>
  );
};

dayjs.extend(utc);
const HistoryDatePicker = () => {
  const [value, setValue] = useState<Dayjs | null>(
    dayjs.utc("2022-04-17T15:30")
  );
  return (
    <div className="w-full absolute z-10 bottom-[120px] flex justify-start ml-12 gap-10 items-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          spacing={2}
          className=" bg-slate-500 border-grey-500 bg-opacity-80 "
          px={10}
          py={3}
          borderRadius={10}
        >
          <Typography>Historical Date:</Typography>
          <DateTimePicker
            value={value}
            onChange={setValue}
            sx={{ color: "white" }}
          />
          <Typography>
            Stored value: {value == null ? "null" : value.format()}
          </Typography>
        </Stack>
      </LocalizationProvider>
    </div>
  );
};
export default UberMap;
