import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerContextProvider = ({ children }) => {
  const [timestampBlockwise, settimestampBlockwise] = useState()
  const [currentSelectedtxIndex, setcurrentSelectedtxIndex] = useState()
  const [selectedTransactionDetails, setselectedTransactionDetails] = useState()

  return (
    <DrawerContext.Provider value={{ timestampBlockwise,settimestampBlockwise,currentSelectedtxIndex,setcurrentSelectedtxIndex,selectedTransactionDetails, setselectedTransactionDetails }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawContext = () => useContext(DrawerContext);
