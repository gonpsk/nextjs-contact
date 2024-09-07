"use client";
import React, { useContext, useState, useEffect } from "react";
import Navbar from "../navbar/page";
import { ProfileContext } from "../profilecontxt";
import Sidebar from "../sidebar/page";
import Footer from "../footer/page";
import axios from "axios";

function Page() {
  const { profilePicture, firstname, lastname, language, setLanguage } = useContext(ProfileContext);

  const [isClick, setIsClick] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null); // Store selected contact for deletion
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const pageSize = 20;
  const totalPages = Math.ceil(100 / pageSize);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  // Fetch contacts with pagination
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3005/users', {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      setContacts(response.data);
      setFilteredContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Handle delete confirmation
  const confirmDelete = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  // Handle delete contact after confirmation
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3005/deleteuser/${selectedContact.id}`);
      setContacts(contacts.filter((contact) => contact.id !== selectedContact.id));
      setFilteredContacts(filteredContacts.filter((contact) => contact.id !== selectedContact.id));
      setShowModal(false); // Close the modal
      setSelectedContact(null); // Clear the selected contact
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Close the modal without deleting
  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      const filtered = contacts.filter(contact =>
        contact.firstname.toLowerCase().includes(value.toLowerCase()) ||
        contact.lastname.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredContacts(contacts);
  };

  // Pagination logic
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage]);

  return (
    <div className="flex flex-1 flex-col h-screen">
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
        <Sidebar  />
        <div className="px-4 py-8 flex flex-col items-center">
          {/* Search and Clear */}
          <div className="mb-4 flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={language === 'EN' ? "Search by first or lastname" : "ค้นหาด้วยชื่อหรือนามสกุล"}
              className="border px-4 py-2 rounded"
            />
            <button
              className="ml-2 bg-gray-300 px-4 py-2 rounded"
              onClick={handleClearSearch}
            >
              {language === 'EN' ? 'Clear' : 'ล้าง'}
            </button>
          </div>

          {/* Contact List */}
          <div className="w-full max-w-3xl">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border">
                  <th className="px-4 py-2">{language === 'EN' ? 'First Name' : 'ชื่อจริง'}</th>
                  <th className="px-4 py-2">{language === 'EN' ? 'Last Name' : 'นามสกุล'}</th>
                  <th className="px-4 py-2">{language === 'EN' ? 'Age' : 'อายุ'}</th>
                  <th className="px-4 py-2">{language === 'EN' ? 'Actions' : 'การกระทำ'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      {language === 'EN' ? 'No contacts found.' : 'ไม่พบรายชื่อ'}
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td className="border px-4 py-2">{contact.firstname}</td>
                      <td className="border px-4 py-2">{contact.lastname}</td>
                      <td className="border px-4 py-2">{contact.age}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => confirmDelete(contact)}
                        >
                          {language === 'EN' ? 'Delete' : 'ลบ'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                {language === 'EN' ? 'Previous' : 'ก่อนหน้า'}
              </button>
              <p className="px-4 py-2 border">{language === 'EN' ? `Page ${currentPage} of ${totalPages}` : `หน้า ${currentPage} จาก ${totalPages}`}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {language === 'EN' ? 'Next' : 'ถัดไป'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {language === 'EN' ? 'Confirm Delete' : 'ยืนยันการลบ'}
            </h2>
            <p>
              {language === 'EN' ? `Are you sure you want to delete ${selectedContact?.firstname} ${selectedContact?.lastname}?` : `คุณแน่ใจหรือไม่ว่าต้องการลบ ${selectedContact?.firstname} ${selectedContact?.lastname}?`}
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                {language === 'EN' ? 'Cancel' : 'ยกเลิก'}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                {language === 'EN' ? 'Delete' : 'ลบ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
