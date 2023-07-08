import { useEffect } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchData,
  setDropoffGeoData,
  setPickupGeoData,
} from "../features/data/dataSlice";
import { circleLayer, heatmapLayer } from "../map-style";
import Control from "./Control";
import Dashboard from "./Dashboard";
import Header from "./Header";
import SearchBar from "./SearchBar";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmVuamE5OCIsImEiOiJjbGlpYzZuOHUxdHV6M2dwN2M5bXNsZTFrIn0.9aQuvhbH6EifAfRcMX-dug";

const UberMap = () => {
  const pickupData = useAppSelector((state) => state.data.pickupGeoData);
  const dropoffData = useAppSelector((state) => state.data.dropoffGeoData);
  const isPickup = useAppSelector((state) => state.data.isPickup);
  const dispatch = useAppDispatch();
  const points = useAppSelector((state) => state.data.points);

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

export default UberMap;
