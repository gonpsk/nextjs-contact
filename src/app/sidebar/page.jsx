"use client";
import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

function page() {
  const [locationUrl, setLocationUrl] = useState("");
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          setLocationUrl(googleMapsUrl);
          window.open(googleMapsUrl, "_blank");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-200 min-h-screen w-64 hidden md:flex">
        <div className="px-24 py-8 flex flex-col space-y-8">
          <Link
            href="/"
            className="text-center flex justify-center items-center text-black hover:bg-blue-500 hover:text-blue-200 no-underline"
          >
            Home
          </Link>

          <div className="dropdown">
            <a
              className="text-black no-underline dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Contact
            </a>

            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="/contactlist">
                  Contact List
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/contactcreate">
                  Contact Create
                </Link>
              </li>
            </ul>
          </div>

          {/* Current Location Menu Item */}
          <a
            onClick={handleCurrentLocation}
            className="text-center flex justify-center items-center text-black hover:bg-blue-500 hover:text-blue-200 no-underline cursor-pointer"
          >
            <FaMapMarkerAlt className="mr-2 text-2xl" /> Map
          </a>
        </div>
      </div>
    </div>
  );
}

export default page;
