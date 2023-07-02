import React, { createContext, useState } from 'react';

// Crea el contexto
export const EmailContext = createContext();

// Crea el proveedor del contexto
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};