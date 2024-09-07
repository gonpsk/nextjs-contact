"use client";
import React, { useContext, useState } from "react";
import Navbar from "../navbar/page";
import { useRouter } from 'next/navigation'; // ใช้ useRouter

import { ProfileContext } from '../profilecontxt';
import Sidebar from "../sidebar/page";
import axios from 'axios';
import Footer from '../footer/page';

function Page() {
  const { profilePicture, firstname, lastname, language, setLanguage } = useContext(ProfileContext);
  const [isClick, setIsClick] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    age: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false); // State สำหรับ modal
  const [modalMessage, setModalMessage] = useState(''); // ข้อความใน modal
  const router = useRouter(); // ตรวจสอบว่า useRouter ถูกใช้ในคอมโพเนนต์ที่ถูกล้อมรอบ

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { firstname, lastname, age } = formData;
    if (!firstname || !lastname) {
      setError(language === 'EN' ? 'Please provide both firstname and lastname.' : 'กรุณาใส่ชื่อและนามสกุลให้ครบ');
      return false;
    }

    if (isNaN(age) || age <= 0) {
      setError(language === 'EN' ? 'Age must be a number.' : 'อายุต้องเป็นตัวเลขที่มากกว่าศูนย์');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:3005/adduser', formData);
      setSuccess(language === 'EN' ? 'User created successfully!' : 'สร้างผู้ใช้สำเร็จ!');
      setModalMessage(language === 'EN' ? 'User created successfully!' : 'สร้างผู้ใช้สำเร็จ!'); // ตั้งข้อความ modal
      setShowModal(true); // แสดง modal
      setTimeout(() => {
        router.push('/contactlist'); // Redirect to Contact List
      }, 2000); // Wait 2 seconds before redirecting
    } catch (error) {
      setError(language === 'EN' ? 'Failed to create user. Please try again.' : 'ไม่สามารถสร้างผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง');
      setModalMessage(language === 'EN' ? 'Failed to create user. Please try again.' : 'ไม่สามารถสร้างผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง'); // ตั้งข้อความ modal สำหรับ error
      setShowModal(true); // แสดง modal
    }
  };

  const closeModal = () => {
    setShowModal(false); // ซ่อน modal
  };

  return (
    <div>
      <Navbar
        profilePicture={profilePicture}
        firstname={firstname}
        lastname={lastname}
        language={language}
        setLanguage={setLanguage}
        toggleNavbar={toggleNavbar}
        isClick={isClick}
      />
      <div className="flex">
        <Sidebar />
        <div className="w-full px-4 py-8 flex flex-col items-center">
          <div className="w-full md:w-[360px] md:h-[360px] flex flex-col items-center justify-center border rounded-lg p-4 mt-8">
            <h1 className="text-xl mb-4">
              {language === 'EN' ? 'Create Contact' : 'สร้างรายชื่อ'}
            </h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder={language === 'EN' ? "Firstname" : "ชื่อจริง"}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder={language === 'EN' ? "Lastname" : "นามสกุล"}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder={language === 'EN' ? "Age" : "อายุ"}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded mt-4"
              >
                {language === 'EN' ? 'Submit' : 'ส่ง'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              {language === 'EN' ? 'Close' : 'ปิด'}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Page;
