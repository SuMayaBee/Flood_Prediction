"use client";
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title } from "chart.js";

// Register the chart components with Chart.js
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title);

const { BaseLayer } = LayersControl;

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 7);
  return null;
}

const customIcon = new L.Icon({
  iconUrl: "/prediction.png", // Ensure you have this icon in your public folder
  iconSize: [25, 25], // Size of the marker icon
  iconAnchor: [17, 55], // Anchor point for the marker
  popupAnchor: [1, -45], // Popup position relative to the marker
});

export default function MapCoordinates() {
  const [stations, setStations] = useState([]);
  const [geoData, setGeoData] = useState({
    lat: 23.685,
    lng: 90.3563,
  });
  const center = [geoData.lat, geoData.lng];

  // Fetch data from all three APIs and merge them based on the 'id'
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stations data
        const stationResponse = await fetch(
          "https://ffwc-api.bdservers.site/data_load/stations/"
        );
        const stationData = await stationResponse.json();

        // Fetch forecast data
        const forecastResponse = await fetch(
          "https://ffwc-api.bdservers.site/data_load/seven-days-forecast-waterlevel-24-hours/"
        );
        const forecastData = await forecastResponse.json();

        // Fetch modified observed data (recent water levels)
        const observedResponse = await fetch(
          "https://ffwc-api.bdservers.site/data_load/modified-observed/"
        );
        const observedData = await observedResponse.json();

        // Merge station data with forecast data and observed data based on the 'id'
        const mergedData = stationData.map((station) => ({
          ...station,
          forecast: forecastData[station.id] || null, // Attach forecast if exists, otherwise null
          observed: observedData[station.id] || null, // Attach observed data if exists, otherwise null
        }));

        setStations(mergedData); // Store merged data in state
      } catch (error) {
        console.error("Error fetching station, forecast, or observed data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this will run once when the component mounts

  // Prepare chart data for visualization in the popup
  const prepareChartData = (station) => {
    if (!station || !station.forecast) return null;

    const forecastDates = Object.keys(station.forecast).map(dateStr => {
      const date = new Date(dateStr);
      date.setDate(date.getDate() + 11); // Add 11 days
      return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    });
    const forecastLevels = Object.values(station.forecast).map((level) => parseFloat(level));

    // Prepare the data for the chart (include danger level, highest water level, and recent observed level for visualization)
    const data = {
      labels: forecastDates,
      datasets: [
        {
          label: "Forecast Water Levels (m)",
          data: forecastLevels,
          borderColor: "rgba(0, 123, 255, 0.8)",
          backgroundColor: "rgba(0, 123, 255, 0.3)",
          fill: false,
          tension: 0.1,
        },
        {
            label: "Recent Water Level (m)",
            data: station.observed
              ? new Array(forecastDates.length).fill(parseFloat(Object.values(station.observed)[0]))
              : [],
            borderColor: "rgba(0, 255, 0, 0.8)", // Green for recent water level
            fill: false,
            tension: 0.1,
          },
        {
          label: "Danger Level (m)",
          data: new Array(forecastDates.length).fill(parseFloat(station.dangerlevel)),
          borderColor: "rgba(255, 0, 0, 0.8)", // Red color for danger level
          borderDash: [5, 5], // Dashed line for better distinction
          fill: false,
          tension: 0.1,
        },
        {
          label: "Highest Water Level (m)",
          data: new Array(forecastDates.length).fill(parseFloat(station.riverhighestwaterlevel)),
          borderColor: "rgba(255, 165, 0, 0.8)", // Orange color for highest water level
          borderDash: [5, 5], // Dashed line for better distinction
          fill: false,
          tension: 0.1,
        },

      ],
    };

    return data;
  };

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <LayersControl position="topright">

        <BaseLayer checked name="Satellite - Google">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            attribution="&copy; Google"
          />
        </BaseLayer>
        <BaseLayer name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
      </LayersControl>

      {/* Loop through the stations and create a Marker for each */}
      {stations
        .filter((station) => station.forecast !== null) // Only show stations with forecast data
        .map((station) => (
          <Marker
            key={station.id}
            position={[parseFloat(station.lat), parseFloat(station.long)]}
            icon={customIcon}
          >
            <Popup maxWidth={650} minWidth={450} closeButton={false} className="wide-popup">
              <div style={{ width: '100%', padding: '10px' }}>
                <p><strong>Station Name:</strong> {station.name}</p>
                <p><strong>River:</strong> {station.river}</p>
                <p><strong>Danger Level:</strong> {station.dangerlevel}</p>
                <p><strong>Highest Water Level:</strong> {station.riverhighestwaterlevel}</p>
                <p><strong>Recent Water Level:</strong> {station.observed ? Object.values(station.observed)[0] : "N/A"}</p>

                {/* Show chart only if forecast data exists */}
                {station.forecast && (
                  <div style={{ width: '100%', height: '350px' }}>
                    <Line
                      data={prepareChartData(station)}
                      options={{
                        scales: {
                          x: { title: { display: true, text: "Date" } },
                          y: { 
                            title: { display: true, text: "Water Level (m)" },
                            ticks: {
                              callback: function (value) {
                                if (value === parseFloat(station.dangerlevel)) {
                                  return 'Danger Level';
                                } else if (value === parseFloat(station.riverhighestwaterlevel)) {
                                  return 'Highest Water Level';
                                } else if (station.observed && value === parseFloat(Object.values(station.observed)[0])) {
                                  return 'Recent Water Level';
                                }
                                return value;
                              }
                            }
                          }
                        },
                        plugins: {
                          legend: { display: true, position: 'top' },
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      height={300}
                    />
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

      <ChangeView coords={center} />
    </MapContainer>
  );
}