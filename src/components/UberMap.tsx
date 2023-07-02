import { Box, Container, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import { circleLayer, heatmapLayer } from "../map-style";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchData } from "../features/data/dataSlice";
import { Point } from "../features/data/Convert";
import SearchBar from "./SearchBar";
import Control from "./Control";
import Header from "./Header";
import RealtimeSlider from "./realtimeSlider";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmVuamE5OCIsImEiOiJjbGlpYzZuOHUxdHV6M2dwN2M5bXNsZTFrIn0.9aQuvhbH6EifAfRcMX-dug";

const UberMap = () => {
  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  const points = useAppSelector((state) => state.data.points);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const data = {
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
              type: point.type,
              id: point.id,
              time: point.time,
              density: point.density,
              lat: point.lat,
              lng: point.long,
            },
            geometry: {
              type: "Point",
              coordinates: [point.long, point.lat],
            },
          }))
        : [],
    };
    setData(data);
  }, [points]);

  return (
    <div style={{ height: "100vh" }}>
      <div className="max-w-sm hover:max-w-lg">
        <Header />
        <SearchBar />
        <Control />
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
          {data && (
            <Source type="geojson" data={data}>
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

export default UberMap;
