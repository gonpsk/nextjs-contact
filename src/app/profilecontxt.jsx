'use client'
import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstname, setFirstname] = useState('John');
  const [lastname, setLastname] = useState('Smith');
  const [language, setLanguage] = useState("EN");


  return (
    <ProfileContext.Provider
      value={{
        profilePicture,
        setProfilePicture,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        language,
        setLanguage
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
