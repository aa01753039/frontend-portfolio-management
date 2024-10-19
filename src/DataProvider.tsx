// DataContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { FinalReturn } from './client';// Adjust the import path accordingly

interface DataContextType {
  responseData: FinalReturn | null;
  setResponseData: React.Dispatch<React.SetStateAction<FinalReturn | null>>;
}

// Provide default values to ensure context is not undefined
export const DataContext = createContext<DataContextType>({
  responseData: null,
  setResponseData: () => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [responseData, setResponseData] = useState<FinalReturn | null>(null);

  return (
    <DataContext.Provider value={{ responseData, setResponseData }}>
      {children}
    </DataContext.Provider>
  );
};
