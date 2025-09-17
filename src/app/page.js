"use client";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import DashboardLayout from "@/app/layout/DashboardLayout";
// import Tables from "./components/tables";

const Dashboard = () => {
  const MapCoordinates = useMemo(
    () =>
      dynamic(() => import("@/app/components/maps"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <DashboardLayout>



      <MapCoordinates/>
      {/* <Tables /> */}
    </DashboardLayout>
  );
};

export default Dashboard;
