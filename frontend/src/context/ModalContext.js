import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
};

export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);

  return (
    <ModalContext.Provider value={{ isLoginOpen, openLogin, closeLogin }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
