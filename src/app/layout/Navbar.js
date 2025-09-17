// components/Navbar.js

"use client";
import React, { useState } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleAccountClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Logic when logout is clicked
    console.log("Logout clicked");
    // Add your logout logic here (e.g., remove tokens, clear sessions, etc.)
  };

  return (
    <div className="flex justify-between bg-white bg-opacity-30 backdrop-blur-md p-3 shadow-lg">
      {/* Left Side: Logo and Brand Name */}
      <div className="flex items-center">
        <Image
          src="/logo.png" // Path to your logo
          alt="FloodShield Logo"
          width={40} // Adjust size as needed
          height={40}
          className="mr-2" // Adds space between logo and text
        />
        <div className="text-xl font-bold tracking-wide font-roboto-slab sm:text-lg md:text-xl lg:text-2xl">
          FloodShield
        </div>
      </div>

      {/* Right Side: User Account */}
      <div className="relative">
        <div
          className="cursor-pointer flex items-center"
          onClick={handleAccountClick}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <FaUserCircle size={24} />
          <div className="ml-2 text-sm">User</div>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-80 backdrop-blur-sm border rounded shadow-lg z-10">
            <button className="px-4 py-2 flex items-center text-gray-800 hover:bg-gray-200 w-full text-left text-sm">
              <FaUserEdit className="mr-2" /> My Account
            </button>
            <button className="px-4 py-2 flex items-center text-gray-800 hover:bg-gray-200 w-full text-left text-sm">
              <FaCog className="mr-2" /> Settings
            </button>
            <Link href="/">
              <button
                className="flex px-4 py-2 items-center text-gray-800 hover:bg-gray-200 w-full text-left text-sm"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
