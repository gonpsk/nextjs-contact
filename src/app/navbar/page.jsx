// Navbar.js
import { useContext, useRef, useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ProfileContext } from "../profilecontxt"; // นำเข้า ProfileContext
import Link from "next/link";

export default function Navbar({ toggleNavbar, isClick }) {
  // ดึงข้อมูลจาก ProfileContext
  const {
    profilePicture,
    firstname,
    lastname,
    language,
    setLanguage,
    setProfilePicture,
  } = useContext(ProfileContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
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

  return (
    <nav className="bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white no-underline">
              <img src="/psk-removebg-preview.png" alt="" width={'70px'} />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {/* Profile Picture */}
              <div className="relative">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile Picture"
                    className="rounded-full cursor-pointer w-[40px] h-[40px] object-cover"
                  />
                ) : (
                  <FaUserCircle
                    className="text-white text-4xl cursor-pointer"
                    size={40}
                  />
                )}
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleProfilePictureChangeNav}
                />
              </div>
              <span className="text-white">
                {firstname} <span>{lastname}</span>
              </span>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-white bg-gray-800 px-2 py-1 rounded"
                >
                  {language}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 hover:text-white no-underline"
                      onClick={() => handleLanguageChange("EN")}
                    >
                      English
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 hover:text-white no-underline"
                      onClick={() => handleLanguageChange("TH")}
                    >
                      ภาษาไทย
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              {isClick ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isClick && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="ml-4 flex items-center space-x-4">
              <Link
                href="/"
                className="text-white p-2 hover:bg-blue-700 rounded-lg no-underline"
              >
                Home
              </Link>
              <div class="dropdown">
                <Link
                  class=" dropdown-toggle text-white no-underline "
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Contact
                </Link>

                <ul class="dropdown-menu">
                  <li>
                    <Link href="/contactlist" className="dropdown-item">
                      Contact List
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="/contactcreate">
                      Contact Create
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
