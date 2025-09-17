// components/DashboardLayout.js

"use client";

import { FaMap, FaTable, FaUpload, FaBars, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import shp from "shpjs"; // Import the shpjs library
import { usePathname } from "next/navigation"; // Import usePathname for App Router

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [uploadedGeoJSON, setUploadedGeoJSON] = useState(null);
  const [showMapTutorial, setShowMapTutorial] = useState(false); // State for tutorial message
  const pathname = usePathname(); // Get the current pathname

  // Function to toggle the sidebar's collapsed state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to handle file uploads and convert shapefiles to GeoJSON
  const onDrop = async (acceptedFiles) => {
    // Process uploaded shapefile and convert to GeoJSON
    const shapefile = acceptedFiles[0];

    try {
      // Read the shapefile using shpjs library
      const geojson = await shp(shapefile);

      // Set the GeoJSON data in state
      setUploadedGeoJSON(geojson);

      // You can now use the geojson data for further processing or visualization
      console.log("Uploaded GeoJSON:", geojson);
    } catch (error) {
      console.error("Error processing shapefile:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Effect to set the sidebar's initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set the initial state
    handleResize();

    // Listen for window resize events to auto-collapse/expand
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to show tutorial when on "Maps" page
  useEffect(() => {
    if (pathname === "/") {
      setShowMapTutorial(true);
    } else {
      setShowMapTutorial(false);
    }
  }, [pathname]);

  // Navigation Links Data
  const navLinks = [
    { name: "Maps", href: "/", icon: <FaMap /> },
    { name: "Table", href: "/pages/tables", icon: <FaTable /> },
    { name: "Prediction", href: "/pages/prediction", icon: <FaUpload /> },
    { name: "Admin Panel", href: "/pages/adminpanel", icon: <FaTable /> },
  ];

  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white bg-opacity-20 backdrop-blur-lg transition-all duration-300 ${
            isCollapsed ? "w-16" : "w-64"
          } shadow-lg border-r border-gray-200 relative`}
        >
          {/* Header Section */}
          <div className="flex items-center justify-between p-4">
            {/* Dashboard Title */}
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
            )}
            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="focus:outline-none text-gray-800"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-300 transition-colors duration-200 ${
                    isActive ? "bg-gray-300 font-semibold" : ""
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {!isCollapsed && (
                    <span className="ml-3 text-md">{link.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Tutorial Message for Maps */}
          {showMapTutorial && !isCollapsed && (
            <div className="mt-6 mx-4 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-10 rounded-lg p-3 shadow-md">
              <p className="text-sm text-gray-800">
                🌟 Welcome to the Maps Section! Explore flood cover visualizations and interact with the map to gain valuable insights.
              </p>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-white bg-opacity-20 backdrop-blur-md border-l border-gray-200 rounded-lg shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
