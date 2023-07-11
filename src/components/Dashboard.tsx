import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

const Dashboard = () => {
  const allPoints = useAppSelector((state) => state.data.allPoints);
  const distances: number[] = [];
  // console.log(allPoints);

  const calDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };
  // console.log(allPoints);

  for (let i = 0; i < allPoints.length - 1; i++) {
    const { dropoff_lat, dropoff_long, pickup_lat, pickup_long } = allPoints[i];

    const nextPoint = allPoints[i + 1];
    const {
      dropoff_lat: nextDropoffLat,
      dropoff_long: nextDropoffLong,
      pickup_lat: nextPickupLat,
      pickup_long: nextPickupLong,
    } = nextPoint;

    const distance =
      calDistance(dropoff_lat, dropoff_long, nextDropoffLat, nextDropoffLong) +
      calDistance(pickup_lat, pickup_long, nextPickupLat, nextPickupLong);

    distances.push(distance);
  }

  const factor = 10 ** 4;
  const totalDistance = distances.reduce((acc, distance) => acc + distance, 0);
  const roundedTotalDistance = Math.round(totalDistance * factor) / factor;

  const licenseCount = new Map<string, number>();
  for (const point of allPoints) {
    const licenseNum = point.Hvfhs_license_num;
    if (licenseCount.has(licenseNum)) {
      licenseCount.set(licenseNum, licenseCount.get(licenseNum)! + 1);
    } else {
      licenseCount.set(licenseNum, 1);
    }
  }

  // Find the license number with the most occurrences
  let mostCommonLicenseNum = "";
  let mostCommonCount = 0;
  for (const [licenseNum, count] of licenseCount) {
    if (count > mostCommonCount) {
      mostCommonLicenseNum = licenseNum;
      mostCommonCount = count;
    }
  }

  // Find the license number with the least occurrences
  let leastCommonLicenseNum = "";
  let leastCommonCount = Number.MAX_SAFE_INTEGER;
  for (const [licenseNum, count] of licenseCount) {
    if (count < leastCommonCount) {
      leastCommonLicenseNum = licenseNum;
      leastCommonCount = count;
    }
  }

  return (
    <div className="fixed mx-100 bottom-40 right-40 p-4 bg-slate-900 z-50 ">
      <h1 className="text-2xl mb-5 font-bold underline">Realtime Dashboard</h1>
      <div>
        <ul>
          <p>The Total Number of Trips {allPoints.length}</p>
          <p>Distance of All Trips: {roundedTotalDistance}km</p>
          <p>The License Number Has Most Trips: {mostCommonLicenseNum}</p>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
