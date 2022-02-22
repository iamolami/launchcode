import React, { createContext, useContext, useState } from "react";

const ClientsContext = createContext();

const ClientsProvider = ({ children }) => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [bmp, setBmp] = useState(0);
  
    const [clients, setClients] = useState([]);

  return (
    <ClientsContext.Provider
      value={{
        first_name,
        setFirst_name,
        last_name,
        setLast_name,
        bmp,
        setBmp,
        clients,
        setClients
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const ClientsState = () => {
  return useContext(ClientsContext);
};

export default ClientsProvider;