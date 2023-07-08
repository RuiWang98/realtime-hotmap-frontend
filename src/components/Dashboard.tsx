import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

const Dashboard = () => {
  //   const [pickupData, setPickupData] = useState([]);

  const data: any = [
    {
      id: "1",
      time: "2023-06-08T12:30:00Z",
      density: 0.5,
      lat: "40.7128",
      long: "-74.0060",
    },
  ];
  const allPoints = useAppSelector((state) => state.data.allPoints);
  const points = useAppSelector((state) => state.data.points);

  return (
    <div className="fixed mx-100 bottom-40 right-40 p-4 bg-slate-900 z-50 ">
      <h1 className="text-2xl mb-5 font-bold underline">Realtime Dashboard</h1>
      <div>
        <ul>
          <p>number of points: {points.length}</p>
          <p>Pickup Latitude: {data.lat}</p>
          <p>Pickup Longitude: {data.long}</p>
          <p>Density: {data.density}</p>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
