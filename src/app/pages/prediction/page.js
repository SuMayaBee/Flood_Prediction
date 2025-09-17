"use client";

import DashboardLayout from "@/app/layout/DashboardLayout";

// Dynamically import the component to avoid server-side rendering issues with Leaflet
//import MapCoordinates from "@/app/components/prediction";
import dynamic from 'next/dynamic';

// Dynamically import the Map component and disable SSR
const DynamicMap = dynamic(() => import('@/app/components/prediction'), { ssr: false });

export default function MapPage() {
  return (
    <DashboardLayout>
        <DynamicMap />
    </DashboardLayout>      
    
  );
}