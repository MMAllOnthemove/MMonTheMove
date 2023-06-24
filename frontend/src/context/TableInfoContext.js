import React, { useState, createContext } from "react";

export const TableInfoContext = createContext();

export const TableInfoContextProvider = (props) => {
  const [tableInfo, setTableInfo] = useState([]);
  return (
    <TableInfoContext.Provider
      value={{
        tableInfo,
        setTableInfo,
      }}
    >
      {props.children}
    </TableInfoContext.Provider>
  );
};
