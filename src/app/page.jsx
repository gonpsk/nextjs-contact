'use client';
import { useContext, useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "./navbar/page";
import { ProfileContext } from "./profilecontxt";
import Link from 'next/link';
import Sidebar from "./sidebar/page";
import Footer from "./footer/page";

export default function Home() {
  const {
    profilePicture,
    setProfilePicture,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    language,
    setLanguage
  } = useContext(ProfileContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [locationUrl, setLocationUrl] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempFirstname, setTempFirstname] = useState(firstname);
  const [tempLastname, setTempLastname] = useState(lastname);
  const [tempProfilePicture, setTempProfilePicture] = useState(profilePicture);

  const dropdownRef = useRef(null);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureChangeNav = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const toggleEditModal = () => {
    setTempProfilePicture(profilePicture);
    setTempFirstname(firstname);
    setTempLastname(lastname);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleSaveChanges = () => {
    setFirstname(tempFirstname);
    setLastname(tempLastname);
    setProfilePicture(tempProfilePicture);
    setIsEditModalOpen(false);
  };

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
    <div className="flex flex-col h-screen">
      <main className="flex-1 flex flex-col">
        <Navbar
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          firstname={firstname}
          lastname={lastname}
          language={language}
          setLanguage={setLanguage}
          toggleNavbar={toggleNavbar}
          isClick={isClick}
        />

        {/* Sidebar */}
        <div className="flex">
          <Sidebar />
          {/* Content */}
          <div className="w-full px-4 py-8 flex flex-col items-center">
            <div className="relative w-36 h-36 md:w-[360px] md:h-[360px] flex items-center justify-center">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="profilepic"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaUserCircle className="text-gray-500" size={360} />
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg">
                {language === 'EN' ? 'Firstname:' : 'ชื่อจริง:'} {firstname}
              </p>
              <p className="text-lg">
                {language === 'EN' ? 'Lastname:' : 'นามสกุล:'} {lastname}
              </p>
            </div>

            <button
              className="mt-2 btn btn-success p-2 px-4"
              onClick={toggleEditModal}
            >
              {language === 'EN' ? 'Edit' : 'แก้ไข'}
            </button>

            {/* Edit Modal */}
            {isEditModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md w-[90%] max-w-md">
                  <h2 className="text-xl mb-4">
                    {language === 'EN' ? 'Edit Profile' : 'แก้ไขโปรไฟล์'}
                  </h2>
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    {tempProfilePicture ? (
                      <img
                        src={tempProfilePicture}
                        alt="profilepic"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="text-gray-500" size={96} />
                    )}
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleProfilePictureChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {language === 'EN' ? 'FirstName' : 'ชื่อจริง'}
                    </label>
                    <input
                      type="text"
                      value={tempFirstname}
                      onChange={(e) => setTempFirstname(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {language === 'EN' ? 'LastName' : 'นามสกุล'}
                    </label>
                    <input
                      type="text"
                      value={tempLastname}
                      onChange={(e) => setTempLastname(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-2"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      className="btn btn-secondary p-2 px-4"
                      onClick={toggleEditModal}
                    >
                      {language === 'EN' ? 'Cancel' : 'ยกเลิก'}
                    </button>
                    <button
                      className="btn btn-primary p-2 px-4"
                      onClick={handleSaveChanges}
                    >
                      {language === 'EN' ? 'Save' : 'บันทึก'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
